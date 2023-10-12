"use strict";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const gr = await request.json();

  const user = await prisma.user.findUnique({
    where: { gr_no: Number(gr) },
  });

  const cookie = request.cookies.get("tic")?.value || "";
  const decodedCookie: any = jwt.decode(cookie);

  if (gr === Number(decodedCookie.gr_no)) {
    return NextResponse.json({ isUser: true, user });
  }

  return NextResponse.json({ isUser: false, user });
}
