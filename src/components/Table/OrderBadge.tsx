import { OrderStatus } from "@/interface/admin/db"; 
import clsx from "clsx";

export function renderOrderStatus(status: OrderStatus) {
  const baseClasses =
    "px-2 py-1 rounded-full text-xs font-medium capitalize inline-block";

  const colorClasses = clsx({
    "bg-orange-400 text-white": status === OrderStatus.PENDING,
    "bg-black text-white": status === OrderStatus.PAID,
    "bg-indigo-500 text-white": status === OrderStatus.SHIPPED,
    "bg-green-600 text-white": status === OrderStatus.COMPLETED,
    "bg-red-500 text-white": status === OrderStatus.CANCELLED,
  });

  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
}
