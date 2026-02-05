import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface StatusIconProps {
  isActive: boolean;
}

const StatusIcon: React.FC<StatusIconProps> = ({ isActive }) => {
  return (
    <div className="relative group inline-block">
      {isActive ? (
        <CheckCircleIcon className="text-green-500 w-10" />
      ) : (
        <XCircleIcon className="text-red-500 w-10" />
      )}
      {/* Tooltip */}
      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 rounded bg-gray-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
};

export default StatusIcon;
