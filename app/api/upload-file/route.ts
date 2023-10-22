import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const fileField = data.get("file");

  if (fileField instanceof File) {
    const originalFileName = fileField.name;
    const fileExtension = originalFileName.substring(
      originalFileName.lastIndexOf(".")
    );
    const uniqueFileName = `${uuidv4()}${fileExtension}`;

    //const dbPath = `/posts/${uniqueFileName}`;
    const path = `./public/posts/${uniqueFileName}`;

    const byteData = await fileField.arrayBuffer();
    const buffer = Buffer.from(byteData);

    try {
      const res = await writeFile(path, buffer);

      return NextResponse.json(
        { path: `/posts/${uniqueFileName}` },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { success: false, error: "An error occurred while writing the file." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, error: "No file was uploaded." },
      { status: 400 }
    );
  }
}
