"use client";

import Aside from "@/components/Admin/Sidebar/Aside";
import LogoutButton from "@/components/Form/Button/Logout";
import { getAuthFromLocalStorage, getFirstName } from "@/utils/auth/storage";
import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";

function SideBarAdmin({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const name = getAuthFromLocalStorage()?.name || "Admin";
    setUserName(name);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden relative !bg-dark-bg !text-white !font-inter">
      <aside
        className={`fixed lg:relative z-40 top-0 left-0 h-full w-64 border-r border-[rgba(255,255,255,0.05)] text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen
            ? "bg-[rgba(0,38,43,1)] translate-x-0"
            : "bg-[rgba(0,38,43,0.7)] -translate-x-full"
        } lg:translate-x-0 flex flex-col flex-shrink-0`}
      >
        <Aside onNavigate={closeSidebar} />
        <div className="p-4 border-t border-gray-700">
          <div className="w-full flex items-center justify-between group">
            <div>
              <p className="text-sm font-medium text-white">
                {mounted ? getFirstName(userName) : ""}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-30 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative z-10">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer lg:hidden fixed top-4 right-7 z-50 p-3 bg-gray-800 text-white rounded-lg shadow-lg hover:opacity-[0.9]"
        >
          {sidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
        </button>

        {children}
      </div>
    </div>
  );
}

export default SideBarAdmin;
