export type PaginationMeta = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  nextPage: number;
  previousPage: number;
};

export function metaBuilder(meta: Partial<PaginationMeta>): PaginationMeta {
  return {
    totalRecords: meta.totalRecords ?? 0,
    totalPages: meta.totalPages ?? 0,
    currentPage: meta.currentPage ?? 1,
    nextPage: meta.nextPage ?? 0,
    previousPage: meta.previousPage ?? 0,
  };
}
