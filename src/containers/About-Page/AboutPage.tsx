import PageTitle from "@/components/common/PageTitle/PageTitle";
import React from "react";
import AboutSection from "../Home-Page/Sections/AboutSection";
import AboutDetails from "./Sections/Details";
import CounterSection from "../Home-Page/Sections/CounterSection";
import PortfolioSection from "../Home-Page/Sections/PortfolioSection";

function AboutPage() {
  return (
    <>
      <PageTitle title="About Us" />
      <AboutSection moreLink={false} />
      <AboutDetails />
      <PortfolioSection />
      <CounterSection />
    </>
  );
}

export default AboutPage;
