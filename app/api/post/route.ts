import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/client";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    console.log(data, "post data");
    const createdPost = await prisma.post.create({
      data: {
        userId: data.id,
        caption: data.caption,
        imageUrl: data.path,
      },
    });

    return NextResponse.json(
      { success: true, post: createdPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 }
    );
  }
}
