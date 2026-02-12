import { NextResponse } from "next/server";
import { seedContent } from "@/lib/content";

export async function POST() {
  try {
    await seedContent();
    return NextResponse.json({ success: true, message: "Content seeded" });
  } catch (error) {
    console.error("Failed to seed content:", error);
    return NextResponse.json({ error: "Failed to seed content" }, { status: 500 });
  }
}
