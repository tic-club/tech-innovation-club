import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { handleLogin } from "./handleLogin";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const requestBody = await request.json();

    if ("gr_no" in requestBody) {
      const { gr_no, password } = requestBody;
      return await handleLogin(gr_no, password, true);
    } else if ("email" in requestBody) {
      const { email, password } = requestBody;
      return await handleLogin(email, password, false);
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
