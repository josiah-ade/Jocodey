"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const skills = [
  { title: "Web Development", percent: "100%" },
  { title: "App Development", percent: "100%" },
  { title: "SEO Optimization", percent: "100%" },
  { title: "Digital Marketing", percent: "100%" },
  { title: "Hosting & Domains", percent: "100%" },
  { title: "Consulting Services", percent: "100%" },
];

export default function AboutSection({
  moreLink = true,
}: {
  moreLink?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="about-area bg-grey section-padding" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:gap-4">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="about-content">
              <h6 className="sub-title">About Our Company</h6>
              <h2>
                Our passion is providing businesses with reliable, affordable,
                and results-driven services.
              </h2>
              <p>
                At Jocodey, we bring together innovation and strategy to deliver
                powerful digital solutions. From web and app development to
                digital marketing and SEO, our comprehensive suite of services
                is designed to boost your visibility, maximize impact, and help
                your business thrive in the digital era.
              </p>

              {/* Skills Section */}
              <div className="skills space-y-4">
                {skills.map((skill, idx) => (
                  <div className="skill-item" key={idx}>
                    <h6 className="flex justify-between">
                      {skill.title} <em>{skill.percent}</em>
                    </h6>
                    <div className="skill-progress bg-gray-200 h-2 rounded overflow-hidden">
                      <div
                        className={`progres h-2 bg-indigo-600 transition-all duration-[2000ms] ease-in-out`}
                        style={{
                          width: visible ? skill.percent : "0%",
                          transitionDelay: `${idx * 300}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              {moreLink && (
                <div className="about-btn-box mt-6">
                  <Link className="default-btn" href="/about">
                    Learn More <span></span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="about-image relative">
              <img src="/img/pp/office2.jpg" alt="About image" />
              <div className="years-design absolute bottom-4 left-4 bg-white p-4 rounded shadow">
                <h2>5+</h2>
                <h5>Years Of Experience</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
