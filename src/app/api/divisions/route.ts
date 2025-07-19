import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const divisions = await prisma.divisions.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return new Response(
      JSON.stringify({
        data: divisions,
        message: "Divisions fetched successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching divisions:", error);
    return new Response("Failed to fetch divisions", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return new Response(JSON.stringify({ error: "Invalid JSON data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const body = await request.json();
    const { name } = body;
    if (!name) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const newDivision = await prisma.$transaction(async (prisma) => {
      const newDivision = await prisma.divisions.create({
        data: {
          name,
        },
      });

      return newDivision;
    });

    return new Response(
      JSON.stringify({
        data: newDivision,
        message: "Division created successfully",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating division:", error);
    return new Response(JSON.stringify({ error: "Error creating division" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
