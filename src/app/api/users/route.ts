import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.users.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return new Response(
      JSON.stringify({ data: users, message: "Users fetched successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Failed to fetch users", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
