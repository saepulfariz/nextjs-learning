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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
      },
    });

    return new Response(
      JSON.stringify({ data: newUser, message: "User created successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Failed to create user", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email } = body;

    if (!id || !name || !email) {
      return new Response(
        JSON.stringify({ error: "ID and Name are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: { name, email, updated_at: new Date() },
    });

    return new Response(
      JSON.stringify({
        data: updatedUser,
        message: "User updated successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Failed to update user", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedUser = await prisma.users.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return new Response(
      JSON.stringify({
        data: deletedUser,
        message: "User deleted successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Failed to delete user", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
