import prisma from "@/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findUnique({
      where: { gr_no: 211180 },
      include: {
        post: true,
        certificates: true,
      },
    });

    console.log(user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({});
}
