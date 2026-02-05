import React from "react";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";

function Socials() {
  return (
    <>
      <ul className="social-icon-list flex gap-4 mb-4">
        <li>
          <a
            href={process.env.NEXT_PUBLIC_SITE_X || "#"}
            target="_blank"
            className="text-gray-600 hover:text-black transition"
          >
            <SiX className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a
            href={process.env.NEXT_PUBLIC_SITE_FACEBOOK || "#"}
            target="_blank"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <SiFacebook className="w-6 h-6" />
          </a>
        </li>

        <li>
          <a
            href={process.env.NEXT_PUBLIC_SITE_LINKEDIN || "#"}
            target="_blank"
            className="text-gray-600 hover:text-blue-700 transition"
          >
            <SiLinkedin className="w-6 h-6" />
          </a>
        </li>
      </ul>
    </>
  );
}

export default Socials;
