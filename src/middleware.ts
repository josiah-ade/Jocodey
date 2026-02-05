import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public access to login and register routes
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;
 

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
