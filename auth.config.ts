import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import { z } from "zod";
import { PrismaClient } from "@root/src/generated/prisma";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface User {
    role?: { name: string };
  }
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        const { email, password } = schema.parse(credentials);

        const user = await prisma.users.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            is_active: true,
            password: true, // Exclude password from the response
            created_at: true,
            updated_at: true,
            verified_at: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        });

        if (!user) throw new Error("No user found");
        if (!user.password) throw new Error("No password set for user");
        if (!user.verified_at) throw new Error("User not verified");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Saat login, tambahkan role dari user ke token
      if (user) {
        // Ambil role dari user, misal user.role
        token.role = user.role?.name || "Member";
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan role ke session agar bisa diakses di client
      // session.user.role = token.role;
      if (session.user) {
        session.user.role =
          typeof token.role === "string"
            ? token.role
            : String(token.role ?? "");
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) throw new Error("No email from Google account");

        const existingUser = await prisma.users.findUnique({
          where: { email: user.email },
        });

        const memberRole = await prisma.roles.findFirst({
          where: { name: "Member" },
        });

        if (!existingUser) {
          await prisma.users.create({
            data: {
              name: user.name || "",
              email: user.email,
              password: Math.random().toString(36).slice(-8), // random string 8 characters "hdxdqyrt"
              is_active: true,
              verified_at: new Date(),
              role_id: memberRole?.id || "",
            },
          });
        } else if (!existingUser.verified_at) {
          await prisma.users.update({
            where: { email: user.email },
            data: { verified_at: new Date() },
          });
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
