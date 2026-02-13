import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureUploadsDir() {
  await mkdir(UPLOADS_DIR, { recursive: true });
}

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

    // If Vercel Blob is configured, use it
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return NextResponse.json({ url: blob.url });
    }

    // Fallback: save to public/uploads/ for local development
    await ensureUploadsDir();
    const ext = path.extname(file.name) || ".png";
    const filename = `${crypto.randomUUID()}${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Failed to upload:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Check server logs for details." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = request.cookies.get("mnm-admin-session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await request.json();

    // If it's a local upload, delete from filesystem
    if (url.startsWith("/uploads/")) {
      const filePath = path.join(UPLOADS_DIR, path.basename(url));
      await unlink(filePath).catch(() => {});
      return NextResponse.json({ success: true });
    }

    // Otherwise delete from Vercel Blob
    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
