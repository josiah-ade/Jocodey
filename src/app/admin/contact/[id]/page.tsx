
import ViewContactPageContainer from "@/containers/Admin/Contact-Page/ViewContact-Page/ViewContactPage";
import { ContactService } from "@/services/contact/contact";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "View Messages",
};
interface Props {
  params: Promise<{ id: string }>;
}

export default async function viewContactPage({ params }: Props) {
  const { id } = await params;
  if (!id) {
    redirect("/admin/expenses");
  }
  const contact = await ContactService.getContactById(id);

  if (!contact) {
    redirect("/admin/contact");
  }

  // console.log(contact)

  return <ViewContactPageContainer contact={contact} />;
}
