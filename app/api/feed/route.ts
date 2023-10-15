import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/client";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        User: true,
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
