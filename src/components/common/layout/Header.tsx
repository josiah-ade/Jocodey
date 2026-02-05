"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import WhatsAppFloat from "./Whatsapp";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  // Sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <div
      className={`navbar-section transition-all duration-300 ease-in-out ${
        isSticky ? "is-sticky" : ""
      }`}
    >
      {/* Mobile Responsive Nav */}
      <div className="techvio-responsive-nav">
        <div className="container mx-auto px-4">
          <div className="techvio-responsive-menu flex items-center justify-between">
            <div className="logo">
              <Link href="/">
                <Image
                  width={150}
                  height={30}
                  src="/img/logo/black.png"
                  className="white-logo"
                  alt="logo"
                />
                <Image
                  width={150}
                  height={50}
                  src="/img/logo/black.png"
                  className="black-logo"
                  alt="logo"
                />
              </Link>
            </div>

            {/* Mobile Toggler */}
            <button
              className="navbar-toggler lg:hidden cursor-pointer"
              onClick={() => setIsOpen(true)}
              aria-label="Toggle navigation"
            >
              <Bars3Icon className="h-7 w-7 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="techvio-nav">
        <div className="container mx-auto px-4">
          <nav className="navbar flex justify-between items-center">
            <Link className="navbar-brand" href="/">
              <Image
                width={150}
                height={50}
                src="/img/logo/black.png"
                className="white-logo"
                alt="logo"
              />
              <Image
                width={150}
                height={50}
                src="/img/logo/black.png"
                className="black-logo"
                alt="logo"
              />
            </Link>

            {/* Collapsible Menu */}
            <div className="navbar-menu hidden md:block">
              <ul className="navbar-nav flex gap-2">
                {navItems.map((item) => (
                  <li key={item.href} className="nav-item">
                    <Link
                      href={item.href}
                      className={`nav-link ${
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                          ? "bg-[rgba(123,104,238,0.1)] rounded-[20px]"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="other-option hidden md:block">
              <Link className="default-btn" href="/contact">
                Contact Us<span></span>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 bg-opacity-50 z-40 transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white z-50 p-6 shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 cursor-pointer"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-7 w-7 text-gray-800" />
          </button>

          <nav className="mt-12 flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "!text-[#7b68ee] font-semibold"
                    : "!text-[#404040]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="default-btn text-center"
            >
              Contact Us<span></span>
            </Link>
          </nav>
        </div>
      </>
      <WhatsAppFloat />
    </div>
  );
}
