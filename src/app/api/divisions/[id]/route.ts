import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const division = await prisma.$transaction(async (prisma) => {
      return await prisma.divisions.findUnique({
        where: { id, deleted_at: null },
      });
    });

    if (!division) {
      return new Response(JSON.stringify({ message: "Division not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        data: division,
        message: "Division fetched successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching division:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch division" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new Response(JSON.stringify({ message: "Name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const division = await prisma.divisions.findUnique({
      where: { id, deleted_at: null },
    });

    if (!division) {
      return new Response(JSON.stringify({ message: "Division not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedDivision = await prisma.$transaction(async (prisma) => {
      return await prisma.divisions.update({
        where: { id },
        data: { name, updated_at: new Date() },
      });
    });

    return new Response(
      JSON.stringify({
        data: updatedDivision,
        message: "Division updated successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating division:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update division" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const division = await prisma.divisions.findUnique({
      where: { id, deleted_at: null },
    });

    if (!division) {
      return new Response(JSON.stringify({ message: "Division not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedDivision = await prisma.$transaction(async (prisma) => {
      return await prisma.divisions.update({
        where: { id },
        data: { deleted_at: new Date() },
      });
    });

    return new Response(
      JSON.stringify({
        data: deletedDivision,
        message: "Division deleted successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting division:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete division" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
