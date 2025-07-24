import { PrismaClient } from "@root/src/generated/prisma";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // Seed roles
  const roles = ["Administrator", "Member"];
  for (const name of roles) {
    // Find role by name first
    const existingRole = await prisma.roles.findFirst({ where: { name } });
    await prisma.roles.upsert({
      where: existingRole ? { id: existingRole.id } : { id: "" }, // Provide a valid id or empty string
      update: {},
      create: { name },
    });
  }

  // Get role IDs
  const adminRole = await prisma.roles.findFirst({
    where: { name: "Administrator" },
  });
  const memberRole = await prisma.roles.findFirst({
    where: { name: "Member" },
  });

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10); // ganti 'admin123' dengan password yang diinginkan
  const memberPassword = await bcrypt.hash("member123", 10);

  // Seed users
  await prisma.users.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@gmail.com",
      password: adminPassword,
      role_id: adminRole?.id!,
    },
  });

  await prisma.users.upsert({
    where: { email: "member@gmail.com" },
    update: {},
    create: {
      name: "Member User",
      email: "member@gmail.com",
      password: memberPassword,
      role_id: memberRole?.id!,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
