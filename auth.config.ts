import CredentialsProvider from "next-auth/providers/credentials";
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
            role: {
              select: {
                name: true,
              },
            },
          },
        });

        if (!user) throw new Error("No user found");
        if (!user.password) throw new Error("No password set for user");
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
  },
  secret: process.env.NEXTAUTH_SECRET,
};
