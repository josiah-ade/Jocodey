import React from "react";
import HeroSection from "./Sections/HeroSection";
import ServiceSection from "./Sections/ServiceSection";
import AboutSection from "./Sections/AboutSection";
import OverviewSection from "./Sections/OverviewSection";
import PortfolioSection from "./Sections/PortfolioSection";
import CounterSection from "./Sections/CounterSection";
import HireSection from "./Sections/HireSection";
import FAQSection from "./Sections/Faq";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <AboutSection />
      <OverviewSection />
      <PortfolioSection />
      <CounterSection />
      <HireSection />
      <FAQSection />
    </>
  );
}

export default HomePage;
