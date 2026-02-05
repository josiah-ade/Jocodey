"use client";

import {
  ChevronUpIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Socials from "./Socials";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll for "Go Top" button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Footer & Subscribe Section */}
      <section className="footer-subscribe-wrapper">
        <div className="footer-area ptb-100">
          <div className="container mx-auto px-4">
            {/* Replaced row/col with Tailwind grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Logo + About */}
              <div>
                <div className="single-footer-widget">
                  <Link href="/" className="footer-logo">
                    <Image
                      src="/img/logo/white.png"
                      alt="logo"
                      width={150}
                      height={50}
                      className="white-logo"
                    />
                  </Link>
                  <p>
                    At Jocodey, we pride ourselves on delivering exceptional
                    value and unparalleled service to our clients. With a focus
                    on collaboration, innovation, and results, we&apos;re
                    dedicated to helping you achieve your digital goals and
                    unlock new opportunities for growth.
                  </p>
                  <div className="main-banner-content !mt-0 !pt-0">
                    {/* <Socials /> */}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <div className="single-footer-widget">
                  <div className="footer-heading">
                    <h3>Our Services</h3>
                  </div>
                  <ul className="footer-quick-links space-y-2">
                    <li>
                      <a href="/services">App Development</a>
                    </li>
                    <li>
                      <a href="/services">Web Development</a>
                    </li>
                    <li>
                      <a href="/services">Domain/Hosting Services</a>
                    </li>
                    <li>
                      <a href="/services">SEO Optimization</a>
                    </li>
                    <li>
                      <a href="/services">Digital Marketing</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Useful Links */}
              <div>
                <div className="single-footer-widget">
                  <div className="footer-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul className="footer-quick-links space-y-2">
                    <li>
                      <Link href="/about">About Us</Link>
                    </li>

                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link href="/portfolio">Our Portfolio</Link>
                    </li>
                    <li>
                      <Link href="/services">Our Services</Link>
                    </li>
                    <li>
                      <Link href="/blog">Our Blog</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              {/* <div>
                <div className="single-footer-widget">
                  <div className="footer-heading">
                    <h3>Contact Info</h3>
                  </div>
                  <div className="footer-info-contact flex items-start gap-2">
                    <PhoneIcon className="w-5 h-5" />
                    <div>
                      <h3>Phone</h3>
                      <span>
                        <a href="tel:+"></a>
                      </span>
                    </div>
                  </div>
                  <div className="footer-info-contact flex items-start gap-2 mt-4">
                    <EnvelopeIcon className="w-5 h-5" />
                    <div>
                      <h3>Email</h3>
                      <span>
                        <a href="mailto:support@stackpro.com.ng">
                          support@stackpro.com.ng
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Copy Right Section */}
      <div className="copyright-area border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <p className="text-sm text-center">
              © {new Date().getFullYear()} Jocodey - All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Go Top Button */}

      <button
        className={`go-top ${isVisible ? "active" : ""}`}
        onClick={scrollToTop}
      >
        <ChevronUpIcon className="w-6 h-6" />
      </button>
    </>
  );
};

export default Footer;
