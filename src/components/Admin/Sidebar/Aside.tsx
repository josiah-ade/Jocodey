"use client";

import { AdminSideBar } from "@/const/admin/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Aside({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const getSecondSegment = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments[1] || "dashboard";
  };
  const activePath = getSecondSegment(pathname);

  return (
    <>
      <div className="h-20 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-xl text-center font-semibold tracking-wider text-white">
          Jocodey.
        </h1>
      </div>
      <nav className="flex-1 p-[2px] overflow-y-auto space-y-1 mt-3">
        {AdminSideBar.map((item) => {
          const activeLink = item.link.length > 0 ? item.link : "dashboard";
          const isActive = activePath === activeLink;

          const Icon = item.icon;

          return (
            <Link
              key={item.link}
              href={`/admin/${item.link}`}
              onClick={onNavigate}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition duration-150 ease-in-out group ${
                isActive
                  ? "bg-dark-bg text-white"
                  : "text-gray-300 hover:bg-darker-bg hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default Aside;
