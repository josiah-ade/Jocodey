import React from "react";
import { Metadata } from "next";
import ContactPage from "@/containers/Contact-Page/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
};

function Contact() {
  return <ContactPage />;
}

export default Contact;
