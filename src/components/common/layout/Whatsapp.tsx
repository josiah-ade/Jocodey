"use client";

import { whatsAppLink } from "@/utils/whatsapp";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-5 left-5 z-50">
      <a
        href={whatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center h-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition px-4"
      >
        {/* Blinking circle behind the icon */}
        <span className="absolute left-0 inline-flex h-14 w-14 rounded-full bg-green-500 opacity-75 animate-ping"></span>

        {/* Icon */}
        <FaWhatsapp size={28} className="relative z-10 text-white" />

        {/* Text */}
        <span className="relative z-10 ml-3 text-white font-medium whitespace-nowrap">
          Chat with us
        </span>
      </a>
    </div>
  );
}
