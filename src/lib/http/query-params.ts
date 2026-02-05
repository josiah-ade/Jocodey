import { Order, PageOptionsDto } from "@/common/Dto/page-options.dto";

// export function parseQueryParams(
//   searchParams: URLSearchParams
// ): PageOptionsDto {
//   const pageOptions = new PageOptionsDto();
//   Object.assign(pageOptions, {
//     limit: searchParams.get("limit")
//       ? parseInt(searchParams.get("limit") as string)
//       : undefined,
//     page: searchParams.get("page")
//       ? parseInt(searchParams.get("page") as string)
//       : undefined,
//     q: searchParams.get("q") || undefined,
//     order: (searchParams.get("order") as "ASC" | "DESC") || undefined,
//   });
//   return pageOptions;
// }

export function parseQueryParams(
  searchParams: URLSearchParams
): PageOptionsDto {
  const pageOptions = new PageOptionsDto();

  const limit = searchParams.get("limit");
  if (limit !== null) {
    pageOptions.limit = parseInt(limit);
  }

  const page = searchParams.get("page");
  if (page !== null) {
    pageOptions.page = parseInt(page);
  }

  const q = searchParams.get("q");
  if (q) {
    pageOptions.q = q;
  }

  const order = searchParams.get("order");
  if (order && (order === Order.ASC || order === Order.DESC)) {
    pageOptions.order = order as Order;
  }

  return pageOptions;
}

export function toURLSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((val) => params.append(key, val)); // Handle array values
      } else {
        params.set(key, value); // Handle single string values
      }
    }
  });
  return params;
}
