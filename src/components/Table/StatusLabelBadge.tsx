import React from "react";

type Status = "Pending" | "In Progress" | "Completed" | "Delivered";

const statusColorMap: Record<Status, string> = {
  Pending: "bg-orange-400 text-white",
  "In Progress": "bg-blue-500 text-white",
  Completed: "bg-green-400 text-white",
  Delivered: "bg-black text-white",
};

interface StatusBadgeProps {
  status: Status;
} 

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = statusColorMap[status] ?? "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-medium inline-block ${color}`}
    >
      {status}
    </span>
  );
}
