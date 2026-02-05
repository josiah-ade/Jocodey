// lib/seo.ts
export function getCanonicalForBlog(slug: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return `${siteUrl}/blog/details/${slug}`;
  }
  