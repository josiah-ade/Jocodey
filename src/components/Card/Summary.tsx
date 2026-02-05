import React from "react";

interface Props {
  bg?: string;
  textColor?: string;
  title?: string;
  subTitle?: string | number;
  subTitleColor?: string; // still allow manual override
  children?: React.ReactNode;
}

function SummaryCardComponent({
  bg,
  textColor,
  title,
  subTitle = "",
  subTitleColor,
  children,
}: Props) {
  // 🔹 detect negative automatically
  const isNegative =
    (typeof subTitle === "number" && subTitle < 0) ||
    (typeof subTitle === "string" && subTitle.trim().startsWith("-"));

  const appliedColor = subTitleColor
    ? subTitleColor
    : isNegative
    ? "text-red-500"
    : "";

  return (
    <>
      {/* Desktop */}
      <div className="hidden bg-[rgba(0,38,43,0.7)] border-[rgba(255,255,255,0.05)] p-2 min-h-[80px] rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300 md:flex gap-3">
        <div
          className={`flex items-center justify-center w-[70px] rounded-sm ${
            bg || "bg-green-400"
          }`}
        >
          {children}
        </div>
        <div className="flex flex-col flex-1 justify-center leading-[1.8] ">
          <h4 className="text-sm text-[var(--gray-text)]">{title}</h4>
          <p className={`font-bold text-base mt-2 ${appliedColor}`}>
            {subTitle}
          </p>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col items-center md:hidden">
        <div
          className={`rounded-full p-4 sm:p-6 bg-[rgba(0,38,43,0.5)] border border-[rgba(255,255,255,0.05)] ${
            textColor || "text-green-400"
          }`}
        >
          {children}
        </div>
        <p className={`font-bold text-lg mt-2 ${appliedColor}`}>{subTitle}</p>
        <h4 className="text-[13px] sm:text-sm text-[var(--gray-text)] text-center">
          {title}
        </h4>
      </div>
    </>
  );
}

export default SummaryCardComponent;
