import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/client";

export async function POST(request: NextRequest) {
  const postId = await request.json();
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      User: true,
    },
  });

  console.log(post, "Post");

  if (post) {
    NextResponse.json(post, { status: 200 });
  } else {
    NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
