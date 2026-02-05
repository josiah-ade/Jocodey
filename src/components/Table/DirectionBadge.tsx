import React from "react";

type Direction = "inflow" | "outflow";

const directionColorMap: Record<Direction, string> = {
  inflow: "bg-green-600 text-white",
  outflow: "bg-red-500 text-white",
};

interface DirectionBadgeProps {
  direction: Direction;
  amount?: number; // optional, if you want to display +amount / -amount
}

export default function DirectionBadge({
  direction,
  amount,
}: DirectionBadgeProps) {
  const color = directionColorMap[direction];
  const sign = direction === "inflow" ? "+" : "-";

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-medium inline-block ${color}`}
    >
      {sign}
      {amount !== undefined ? amount.toLocaleString() : direction.toUpperCase()}
    </span>
  );
}
