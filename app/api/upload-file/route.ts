import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const fileField = data.get("file");
  const grNumber = data.get("grNumber");

  if (fileField instanceof File) {
    const originalFileName = fileField.name;
    const fileExtension = path.extname(originalFileName);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;

    // Define the directory path based on the gr number
    const directoryPath = `./public/posts/${grNumber}/`;

    // Create the directory if it doesn't exist
    try {
      await mkdir(directoryPath, { recursive: true });
    } catch (error) {
      console.error("Error creating directory:", error);
      return NextResponse.json(
        {
          success: false,
          error: "An error occurred while creating the directory.",
        },
        { status: 500 }
      );
    }

    // Define the file path
    const filePath = path.join(directoryPath, uniqueFileName);

    const byteData = await fileField.arrayBuffer();
    const buffer = Buffer.from(byteData);

    try {
      await writeFile(filePath, buffer);

      return NextResponse.json(
        { path: `/posts/${grNumber}/${uniqueFileName}` },
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
