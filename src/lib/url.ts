"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function useCurrentUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return `${siteUrl}${pathname}${
    searchParams.toString() ? "?" + searchParams.toString() : ""
  }`;
}
