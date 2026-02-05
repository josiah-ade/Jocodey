"use client";

import { logoutUser } from "@/app/(no layout)/admin/(auth)/login/actions";
import { navigateWithProgress } from "@/utils/navigation";
import { showError, showSuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { PiSignOut } from "react-icons/pi";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.success) {
      showSuccess(res.message);
      navigateWithProgress(router, "/admin/login");
    } else {
      showError(res.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-gray-400 group-hover:text-gray-300"
    >
      <div className="flex flex-col items-center justify-start">
        <PiSignOut className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
        Sign Out
      </div>
    </button>
  );
}
