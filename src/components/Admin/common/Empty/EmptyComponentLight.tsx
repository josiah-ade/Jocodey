import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

type EmptyStateLightProps = {
  message?: string;
  icon?: React.ElementType;
};

const EmptyStateLight: React.FC<EmptyStateLightProps> = ({
  message = "Nothing to display in your cart.",
  icon: Icon = ShoppingBagIcon,
}) => {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center text-center bg-white border border-gray-200 p-6 rounded-xl">
      <Icon className="h-20 w-20 md:h-30 md:w-30 text-gray-500 mb-4" />
      <p className="text-gray-700 text-sm font-normal md:text-[16px]">
        {message}
      </p>
    </div>
  );
};

export default EmptyStateLight;
