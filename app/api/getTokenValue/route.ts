import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const cookie = (await request.cookies.get("tic")?.value) || "";
  const decodedCookie: any = await jwt.decode(cookie);

  return NextResponse.json(decodedCookie);
}
