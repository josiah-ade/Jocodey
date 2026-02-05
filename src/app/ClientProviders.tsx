"use client";

import { usePathname } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource-variable/dosis";
import "@fontsource-variable/catamaran";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "./page.css";
import "./responsive.css";
import { ToastContainer } from "react-toastify";
import GeneralLayout from "@/layout/GeneralLayout";
import { Suspense } from "react";
import RouteTracker from "@/components/route/RouteTracker";
import GlobalModals from "@/components/Modal/Global";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <NextTopLoader
        initialPosition={0.4}
        height={4}
        zIndex={9999999999}
        color="#ff9800"
      />
      {isAdminRoute ? children : <GeneralLayout>{children}</GeneralLayout>}
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
      <GlobalModals />
      <ToastContainer />
    </>
  );
}
