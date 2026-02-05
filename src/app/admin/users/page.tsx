import UserPageContainer from "@/containers/Admin/Users-Page/UserPage";
import { parseQueryParams, toURLSearchParams } from "@/lib/http/query-params";
import { UserService } from "@/services/users/users";
import { Metadata } from "next";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UserPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const pageOptions = parseQueryParams(toURLSearchParams(resolvedSearchParams));
  const response = await UserService.getAllUsers(pageOptions);
  if (!response) {
    redirect("/admin");
  }
  const data = response.data;
  const totalRecords = response.meta.totalRecords;
  const totalPages = response.meta.totalPages || 0;
  const currentPage = response.meta.currentPage || 0;
  const nextPage = response.meta.nextPage || 0;
  const previousPage = response.meta.previousPage || 0;
  const resData = {
    data,
    totalRecords,
    totalPages,
    nextPage,
    currentPage,
    previousPage,
  };

  return <UserPageContainer data={resData} />;
}
