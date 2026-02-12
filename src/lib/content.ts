import { Redis } from "@upstash/redis";
import { SiteContent } from "./types";
import { defaultContent } from "@/data/defaultContent";

const CONTENT_KEY = "site:content";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getContent(): Promise<SiteContent> {
  try {
    const redis = getRedis();
    if (!redis) return defaultContent;

    const content = await redis.get<SiteContent>(CONTENT_KEY);
    if (content) return content;
  } catch (error) {
    console.error("Failed to fetch from KV, using default content:", error);
  }
  return defaultContent;
}

export async function setContent(content: SiteContent): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(CONTENT_KEY, content);
}

export async function seedContent(): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");

  const existing = await redis.get(CONTENT_KEY);
  if (!existing) {
    await redis.set(CONTENT_KEY, defaultContent);
  }
}
