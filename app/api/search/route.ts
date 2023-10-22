import prisma from "@/db/client";
import { User } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Missing query parameter" },
        { status: 400 }
      );
    }

    const allUsers: any = await prisma.user.findMany({
      include: { post: true },
    });

    const searchString = new RegExp(query, "i");

    const users: User[] = allUsers.filter(
      (user: {
        first_name: string;
        last_name: string;
        email: string;
        gr_no: any;
      }) => {
        return (
          user.first_name.match(searchString) ||
          user.last_name.match(searchString) ||
          user.email.match(searchString) ||
          String(user.gr_no) === query
        );
      }
    );

    return NextResponse.json({ body: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
