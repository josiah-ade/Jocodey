import { instanceToPlain } from "class-transformer";

export class OffsetPaginationDto<T> {
  readonly data: T[]; // Still typed as T[]
  meta: {
    limit: number;
    currentPage: number;
    nextPage?: number;
    previousPage?: number;
    totalRecords: number;
    totalPages: number;
    totalValue?: number;
    totalCategories?: number;
    totalSubCategories?: number;
    totalDeductions?: number;
    grossAmountPayroll?: number;
    grossTotalPayroll?: number;
  };

  constructor(data: T[], meta: OffsetPaginationDto<T>["meta"]) {
    // We trust that data is an array of class instances of T
    this.data = instanceToPlain(data) as T[];
    this.meta = meta;
  }
}
