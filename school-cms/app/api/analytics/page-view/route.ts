import { NextResponse, type NextRequest } from "next/server";
import { logServerError } from "@/lib/errors";
import { connectToDatabase } from "@/lib/db/connect";
import PageView from "@/models/PageView";

export async function POST(request: NextRequest) {
  if (request.cookies.get("school_cms_analytics_consent")?.value !== "accepted") {
    return NextResponse.json({ error: "Analytics consent is required." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    logServerError("invalid analytics page view payload", error);
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const path =
    typeof body === "object" && body !== null && "path" in body
      ? body.path
      : null;

  if (
    typeof path !== "string" ||
    path.length > 200 ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /^\/(?:admin|api|_next)(?:\/|$)/.test(path) ||
    /[?#\\]/.test(path) ||
    /[\u0000-\u001f]/.test(path)
  ) {
    return NextResponse.json({ error: "Invalid page path." }, { status: 400 });
  }

  try {
    await connectToDatabase();
    await PageView.create({ path });
  } catch (error) {
    logServerError("analytics page view could not be saved", error);
    return NextResponse.json(
      { error: "Unable to record page view." },
      { status: 500 }
    );
  }

  return new NextResponse(null, { status: 204 });
}
