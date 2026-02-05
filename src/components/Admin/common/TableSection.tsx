import { useApiDataStore } from "@/store/api/data";
import { UsersIcon } from "@heroicons/react/24/outline";

import LoadingState from "./Loading/LoadingState";
import Table from "@/components/Table/Table";
import AdminPagination from "@/components/Pagination/AdminPagination";
import EmptyState from "./Empty/EmptyComponent";
import { ColumnDef } from "@tanstack/react-table";

export interface TableSectionProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T>[];
  message?: string;
  meta?: {
    currentPage: number;
    totalPages: number;
    nextPage?: number;
    previousPage?: number;
  };
}

function TableSection<T>({
  data,
  title,
  columns,
  meta,
  message = "No Item yet",
}: TableSectionProps<T>) {
  const { loading } = useApiDataStore();

  return (
    <>
      {data.length > 0 ? (
        <section className="bg-bg1 border border-border1 p-3 md:p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-white !mb-5">{title}</h3>

          <Table data={data} columns={columns} />
          <div className="md:hidden mt-10"></div>
          <div className="mt-10">{meta && <AdminPagination meta={meta} />}</div>
        </section>
      ) : loading ? (
        <LoadingState />
      ) : (
        <EmptyState message={message} icon={UsersIcon} />
      )}
    </>
  );
}

export default TableSection;
