import { NextRequest, NextResponse } from "next/server";
import { getContent, setContent } from "@/lib/content";
import { revalidatePath } from "next/cache";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const session = request.cookies.get("mnm-admin-session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await setContent(body);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save content:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
