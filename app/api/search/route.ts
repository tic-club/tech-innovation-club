import prisma from "@/db/client";
import { User } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return {
        status: 400,
        body: { error: "Missing query parameter" },
      };
    }

    const allUsers: User[] = await prisma.user.findMany();

    const searchString = new RegExp(query, "i");

    const users: User[] = allUsers.filter((user) => {
      return (
        user.first_name.match(searchString) ||
        user.last_name.match(searchString) ||
        user.email.match(searchString) ||
        String(user.gr_no) === query
      );
    });

    return NextResponse.json({
      status: 200,
      body: users,
    });
  } catch (error) {
    return {
      status: 500,
      body: { error: "An error occurred while processing the request." },
    };
  }
}
