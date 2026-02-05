"use client";

import Link from "next/link";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
  const getPages = () => {
    const pages: (number | "...")[] = [];

    // Always show first page
    pages.push(1);

    // Left ellipsis
    if (page > 4) {
      pages.push("...");
    }

    // Pages around current page
    for (
      let i = Math.max(2, page - 2);
      i <= Math.min(totalPages - 1, page + 2);
      i++
    ) {
      pages.push(i);
    }

    // Right ellipsis
    if (page < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="col-lg-12 col-md-12">
      <div className="pagination-area flex justify-center items-center gap-2 mt-10">
        {/* Prev button */}
        {page > 1 && (
          <Link
            href={`?page=${page - 1}`}
            className="prev page-numbers  border rounded hover:bg-gray-200 !flex !items-center !justify-center"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
        )}

        {/* Page numbers */}
        {pages.map((p, index) =>
          p === "..." ? (
            <span key={index} className=" text-gray-500">
              ...
            </span>
          ) : p === page ? (
            <span
              key={p}
              aria-current="page"
              className="page-numbers current  border rounded bg-gray-800 text-white"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={`?page=${p}`}
              className="page-numbers  border rounded hover:bg-gray-200"
            >
              {p}
            </Link>
          )
        )}

        {/* Next button */}
        {page < totalPages && (
          <Link
            href={`?page=${page + 1}`}
            className="next page-numbers  border rounded hover:bg-gray-200 !flex !items-center !justify-center"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
