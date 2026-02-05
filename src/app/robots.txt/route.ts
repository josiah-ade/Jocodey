import { NextResponse } from "next/server";

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return new NextResponse(
    `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: ${siteUrl}/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
