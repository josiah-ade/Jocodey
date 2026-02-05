import ContactPageContainer from "@/containers/Admin/Contact-Page/NewContact-Page/NewContactPage";
import { parseQueryParams, toURLSearchParams } from "@/lib/http/query-params";
import { ContactService } from "@/services/contact/contact";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Messages",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const pageOptions = parseQueryParams(toURLSearchParams(resolvedSearchParams));

  const response = await ContactService.getAllContacts(pageOptions);
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

  return <ContactPageContainer data={resData} />;
}
