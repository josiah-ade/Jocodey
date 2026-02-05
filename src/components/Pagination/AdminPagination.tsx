"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  meta: {
    currentPage: number;
    totalPages: number;
    nextPage?: number;
    previousPage?: number;
  };
}

export default function AdminPagination({ meta }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (meta.totalPages <= 1) return null;

  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      {/* Prev Button (only show if not on first page) */}
      {meta.currentPage > 1 && (
        <button
          onClick={() => goToPage(meta.previousPage!)}
          className="px-3 py-2 rounded-xl bg-[#f2f3f7] text-black hover:bg-yellow-600 hover:text-white transition"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      )}

      {/* Numbered Pages */}
      <div className="flex gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              p === meta.currentPage
                ? "bg-yellow-600 text-white shadow-md"
                : "bg-[#f2f3f7] text-black hover:bg-yellow-600 hover:text-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next Button (only show if not on last page) */}
      {meta.currentPage < meta.totalPages && (
        <button
          onClick={() => goToPage(meta.nextPage!)}
          className="px-3 py-2 rounded-xl bg-[#f2f3f7] text-black hover:bg-yellow-600 hover:text-white transition"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
