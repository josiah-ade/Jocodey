import ServicePage from "@/containers/Service-Page/ServicePage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Services",
};

function Service() {
  return <ServicePage />;
}

export default Service;
