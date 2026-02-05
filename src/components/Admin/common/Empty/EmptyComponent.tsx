import React from "react";
import { InboxIcon } from "@heroicons/react/24/outline";

type EmptyStateProps = {
  message?: string;
  icon?: React.ElementType;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "Nothing to display here.",
  icon: Icon = InboxIcon,
}) => {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center text-center bg-bg1 border-border1 p-6 rounded-xl shadow-lg">
      <Icon className="h-20 w-20 md:h-30 md:w-30 text-gray-text mb-4" />
      <p className="text-white text-sm font-normal md:text-[16px]">{message}</p>
    </div>
  );
};

export default EmptyState;
