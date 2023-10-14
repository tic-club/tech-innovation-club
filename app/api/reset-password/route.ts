import prisma from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password, _token: token } = body;

  const user = await prisma.user.findUnique({
    where: {
      forgotPasswordToken: decodeURIComponent(token),
    },
  });

  if (!user)
    return NextResponse.json({ error: "Invaild token" }, { status: 404 });

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    await prisma.user.update({
      where: { forgotPasswordToken: decodeURIComponent(token) },
      data: { password: hashedPassword, forgotPasswordToken: null },
    });
    return NextResponse.json({ message: "Password Updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "Password update failed" },
      { status: 500 }
    );
  }
}
