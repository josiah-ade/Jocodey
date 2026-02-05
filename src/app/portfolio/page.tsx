import PortfolioPage from "@/containers/Portfolio-Page/PortfolioPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Portfolio",
};

function Portfolio() {
  return <PortfolioPage />;
}

export default Portfolio;
