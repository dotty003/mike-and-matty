import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const session = request.cookies.get("mnm-admin-session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Failed to upload:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = request.cookies.get("mnm-admin-session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await request.json();
    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
