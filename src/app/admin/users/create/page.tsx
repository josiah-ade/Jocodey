
import NewUserPageContainer from "@/containers/Admin/Users-Page/NewUserPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "New User",
};

function NewUserPage() {
  return <NewUserPageContainer />;
}

export default NewUserPage;
