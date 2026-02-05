"use client";

import Footer from "@/components/common/layout/Footer";
import Header from "@/components/common/layout/Header";

function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default GeneralLayout;
