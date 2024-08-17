import { NextRequest, NextResponse } from "next/server";
import { roastResume } from "@/lib/gemini";
import pdfParse from "pdf-parse";

export async function POST(request: NextRequest) {
  try {
    // Parse form data from the request
    const formData = await request.formData();

    // Access file from form data
    const file = formData.get('resumeFile');

    if (file && file instanceof Blob) {
      // Convert the Blob to a buffer
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Parse PDF file
      const pdfData = await pdfParse(fileBuffer);
      const resumeText = pdfData.text;

      if (!resumeText) {
        return NextResponse.json({ error: "Resume content is required" }, { status: 400 });
      }

      // Roast the resume text
      const roastResult = await roastResume(resumeText);
      return NextResponse.json({ result: roastResult });
    } else {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error roasting resume:", error);
    return NextResponse.json({ error: "Failed to roast resume" }, { status: 500 });
  }
}
