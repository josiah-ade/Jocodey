import { Uuid } from "@/common/types/common.types";
import EditUserPageContainer from "@/containers/Admin/Users-Page/EditUserPage";
import { UserService } from "@/services/users/users";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit User",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;
  if (!id) {
    redirect("/admin/users");
  }
  const user = await UserService.getUserById(id as Uuid);

  if (!user) {
    redirect("/admin/users");
  }

  //   console.log(user)

  return <EditUserPageContainer user={user} />;
}
