import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roles = await prisma.roles.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return new Response(
      JSON.stringify({ data: roles, message: "Roles fetched successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching roles:", error);
    return new Response("Failed to fetch roles", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
