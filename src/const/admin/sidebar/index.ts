import { AdminSideBarProps } from "@/interface/admin/sidebar";
import {
  HomeIcon,
  InboxIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

export const AdminSideBar: AdminSideBarProps[] = [
  {
    title: "Dashboard",
    link: "",
    icon: HomeIcon,
  },
  {
    title: "Messages",
    link: "contact",
    icon: InboxIcon,
  },
  {
    title: "Users",
    link: "users",
    icon: UserGroupIcon,
  },
];
