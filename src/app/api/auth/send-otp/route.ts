import { PrismaClient } from "@/generated/prisma";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user)
    return Response.json({ message: "User not found" }, { status: 404 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const get_otp = await prisma.$transaction(async (prisma) => {
    return await prisma.otps.create({
      data: {
        code: otp,
        expiry,
        user_id: user.id,
      },
    });
  });

  try {
    if (process.env.EMAIL_SEND && process.env.EMAIL_SEND === "true") {
      console.log("Sending OTP to email:", email);

      // send email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      });
    }

    return Response.json({ message: "OTP sent" });
  } catch (error) {
    console.error("Error sending OTP:", error);

    // delete otp if error
    await prisma.otps.delete({ where: { id: get_otp.id } });
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  }
}
