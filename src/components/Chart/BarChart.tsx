"use client";

import {
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

interface ChartData {
  month: string;
  total: number;
}

interface BarChartProps {
  title?: string;
  data: ChartData[];
  height?: number;
  color?: string; // can be hex, rgb, or Tailwind color like "red-500"
}

function resolveTailwindColor(color: string): string {
  if (!color) return "#3b82f6"; // fallback (blue-500)
  if (color.startsWith("#") || color.startsWith("rgb")) return color;

  const [name, shade] = color.split("-");

  // Ensure both name and shade exist and are valid keys
  const colorGroup = colors[name as keyof typeof colors];

  if (
    typeof colorGroup === "object" &&
    colorGroup !== null &&
    shade in colorGroup
  ) {
    return (colorGroup as Record<string, string>)[shade];
  }

  return "#3b82f6"; // fallback if invalid
}

export function BarChart({
  title,
  data,
  height = 320,
  color = "blue-500",
}: BarChartProps) {
  const resolvedColor = resolveTailwindColor(color);

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-base text-white font-semibold !mb-8 text-center">
          {title}
        </h2>
      )}

      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data}>
            {/* Gradient */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={resolvedColor} stopOpacity={0.9} />
                <stop
                  offset="95%"
                  stopColor={resolvedColor}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#9ca3af"
              strokeWidth={0.5}
              opacity={0.4}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 0.5, opacity: 0.5 }}
              tickLine={{ stroke: "#d1d5db", strokeWidth: 0.5, opacity: 0.5 }}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#d1d5db", strokeWidth: 0.5, opacity: 0.5 }}
              tickLine={{ stroke: "#d1d5db", strokeWidth: 0.5, opacity: 0.5 }}
              tickFormatter={(value) => value}
            />

            {/* Tooltip */}
            <Tooltip
              formatter={(value: number) => value}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "14px",
                color: "#fff",
              }}
              cursor={{ fill: "rgba(59,130,246,0.1)" }}
            />

            <Bar
              dataKey="total"
              fill="url(#chartGradient)"
              radius={[8, 8, 0, 0]}
            />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
