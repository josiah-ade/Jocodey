
import SideBarAdmin from "@/layout/Admin";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideBarAdmin>{children}</SideBarAdmin>;
}
