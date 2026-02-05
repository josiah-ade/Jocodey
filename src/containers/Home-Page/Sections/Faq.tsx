"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What services does Jocodey provide?",
    answer:
      "We specialize in web development, app development, SEO optimization, digital marketing, hosting, and consulting services to help businesses grow online.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on the project scope and features, but typically, most websites are completed within 2-6 weeks.",
  },
  {
    question: "Do you offer ongoing website maintenance?",
    answer:
      "Yes, we provide website maintenance, updates, and performance optimization to ensure your site stays secure and up-to-date.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely! We can modernize your existing website, improve its speed, SEO, and user experience.",
  },
  {
    question: "Do you develop mobile apps?",
    answer:
      "Yes, our app development team builds both Android and iOS applications tailored to your business needs.",
  },
  {
    question: "How can I get a quote for my project?",
    answer:
      "You can contact us through our website’s contact form or email us directly with your project details. Our team will respond promptly with a customized quote.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h6 className="text-blue-600 font-semibold uppercase tracking-wide">
            FAQs
          </h6>
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
