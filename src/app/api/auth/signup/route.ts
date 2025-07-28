import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  });

  const { email, password, name } = schema.parse(data);

  const exist = await prisma.users.findUnique({
    where: { email },
  });

  if (exist) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const memberRole = await prisma.roles.findFirst({
    where: { name: "Member" },
  });

  if (!memberRole) {
    return NextResponse.json(
      { error: "Member role not found" },
      { status: 500 }
    );
  }

  try {
    const user = await prisma.$transaction(async (prisma) => {
      const user = await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: {
            connect: { id: memberRole.id },
          },
        },
      });

      return user;
    });

    // ⬇️ Call the send-otp API after user is created
    const response = await fetch(`${process.env.BASE_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      // delete data user
      await prisma.users.delete({ where: { id: user.id } });
      return NextResponse.json(
        { error: "Registration Failed, Unable to send OTP" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    // console.error("Error creating user:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
