import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// TinaCloud calls this (Project → Webhooks) whenever content is saved, so
// edits go live in seconds instead of waiting for a full rebuild and
// deploy. The site is small, so every page is refreshed: each one renders
// again from TinaCloud on its next visit. The secret is set as
// REVALIDATE_SECRET in Vercel and added to the webhook URL as ?secret=.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = new URL(request.url).searchParams.get("secret");
  if (!secret || given !== secret) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
