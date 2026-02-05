"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useGeneralStore } from "@/store/general";

export default function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setRoute } = useGeneralStore();

  useEffect(() => {
    // Only track routes under /admin but not /admin/auth
    if (!pathname.startsWith("/admin")) return;
    if (pathname.startsWith("/admin/auth")) return;

    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;
    setRoute(fullPath);
  }, [pathname, searchParams, setRoute]);

  return null;
}
