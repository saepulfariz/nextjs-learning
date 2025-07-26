import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "Administrator") {
      return NextResponse.json(
        { error: "Only Administrator can show users" },
        { status: 403 }
      );
    }

    const users = await prisma.users.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        is_active: true,
        password: false, // Exclude password from the response
        created_at: true,
        updated_at: true,
        role: {
          select: {
            name: true,
          },
        },
      },
      // include: {
      //   role: true,
      // },
    });

    // Map role.name to role_name for each user
    const usersWithRoleName = users.map((user) => ({
      ...user,
      role_name: user.role?.name,
      role: undefined, // remove role object if not needed
    }));
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
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "Administrator") {
      return NextResponse.json(
        { error: "Only Administrator can create users" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, role_id } = body;

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

    if (role_id === undefined || role_id === null) {
      return new Response(JSON.stringify({ error: "Role ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if the role_id exists in the roles table before creating the user
    const roleExists = await prisma.roles.findUnique({
      where: { id: role_id },
    });

    if (!roleExists) {
      return new Response(JSON.stringify({ error: "Role ID does not exist" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check for unique email before creating user
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role_id: role_id,
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
    return new Response(
      JSON.stringify({ error: "Failed to create user", data: error }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "Administrator") {
      return NextResponse.json(
        { error: "Only Administrator can edit users" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, name, email, role_id, password } = body;

    if (!id || !name || !email) {
      return new Response(
        JSON.stringify({ error: "ID and Name are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (role_id === undefined || role_id === null) {
      return new Response(JSON.stringify({ error: "Role ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (password) {
      // If password is provided, hash it
      const hashedPassword = await bcrypt.hash(password, 10);
      body.password = hashedPassword; // Update body with hashed password
    }

    // Prepare update data object
    const updateData: {
      name: string;
      email: string;
      role_id: string;
      updated_at: Date;
      password?: string;
    } = {
      name,
      email,
      role_id,
      updated_at: new Date(),
    };
    if (password) {
      updateData.password = body.password;
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: updateData,
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
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "Administrator") {
      return NextResponse.json(
        { error: "Only Administrator can delete users" },
        { status: 403 }
      );
    }

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
