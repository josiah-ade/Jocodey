"use client";
import { dashboardTabs } from "@/const/admin/Tabs/StaffTabs";
import { useState } from "react";
import ContactTab from "./Contact/ContactTab";

export default function DashboardPageContainer() {
  const tabContents: Record<string, React.ReactNode> = {
    Messages: <ContactTab />,
  };

  const [activeTab, setActiveTab] = useState("Messages");

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center gap-10 mb-8 border-b border-border2 pb-4">
          {dashboardTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[90px] text-sm border-2  border-border1 p-3 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-bg1 ${
                activeTab === tab.id ? "text-green  bg-bg1" : "text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>{tabContents[activeTab]}</div>
      </div>
    </>
  );
}
