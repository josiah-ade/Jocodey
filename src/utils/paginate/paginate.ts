import { PageOptionsDto } from "@/common/Dto/page-options.dto";
import { OffsetPaginationDto } from "@/common/Dto/offset-pagination.dto";
import { prisma } from "@/lib/prisma";

export async function prismaPaginate<T>(
  model: keyof typeof prisma,
  pageOptions: PageOptionsDto,
  where: any = {},
  orderBy?: any
): Promise<OffsetPaginationDto<T>> {
  const limit = pageOptions.limit || 50;
  const page = pageOptions.page || 1;
  const skip = pageOptions.offset;

  const totalRecords = await (prisma[model] as any).count({ where });

  const data = await (prisma[model] as any).findMany({
    where,
    skip,
    take: limit,
    orderBy: orderBy || {
      createdAt: pageOptions.order?.toLowerCase() || "desc",
    },
  });

  const totalPages = Math.ceil(totalRecords / limit);
  const nextPage = page < totalPages ? page + 1 : undefined;
  const previousPage = page > 1 ? page - 1 : undefined;

  return new OffsetPaginationDto<T>(data, {
    limit,
    currentPage: page,
    totalRecords,
    totalPages,
    nextPage,
    previousPage,
  });
}
