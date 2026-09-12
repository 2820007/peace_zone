import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";

/** Ends the current admin session without relying on client-side JavaScript. */
export async function GET(request: Request) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
