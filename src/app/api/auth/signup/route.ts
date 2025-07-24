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

  const user = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: {
        connect: { id: memberRole?.id! },
      },
    },
  });

  return NextResponse.json({ user });
}
