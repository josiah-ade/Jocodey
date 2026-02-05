import AboutPage from "@/containers/About-Page/AboutPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
};


function page() {
  return <AboutPage />;
}

export default page;
