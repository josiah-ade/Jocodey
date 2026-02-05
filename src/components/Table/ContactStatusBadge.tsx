import { ContactStatus } from "@/interface/admin/db";
import clsx from "clsx";

export function renderContactStatus(status: ContactStatus) {
  const baseClasses =
    "px-2 py-1 rounded-full text-xs font-medium capitalize inline-block";

  const colorClasses = clsx({
    "bg-orange-500 text-white": status === ContactStatus.NEW,
    "bg-purple-500 text-white": status === ContactStatus.READ,
    "bg-green-500 text-white": status === ContactStatus.RESPONDED,
    "bg-black text-white": status === ContactStatus.ARCHIVED,
  });

  return (
    <span className={`${baseClasses} ${colorClasses} bg-pur`}>{status}</span>
  );
}
