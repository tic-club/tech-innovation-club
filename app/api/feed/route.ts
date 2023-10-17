import prisma from "@/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        User: true,
      },
      orderBy: {
        dateCreated: "desc",
      },
    });
    console.log(posts);

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching posts." },
      { status: 500 }
    );
  }
}
