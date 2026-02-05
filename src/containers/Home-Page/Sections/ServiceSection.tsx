"use client";

import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  CloudIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    icon: CodeBracketIcon,
    title: "Web Development",
    tagline: "Build fast, secure, and scalable websites.",
    desc: "At Jocodey, we design and develop powerful websites and web applications tailored to your goals. Our expert team ensures every project delivers seamless performance, engaging experiences, and measurable results.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "App Development",
    tagline: "Innovative mobile apps that engage and perform.",
    desc: "At Jocodey, we craft innovative mobile applications that enhance customer engagement and drive business growth. From concept to launch, our custom app solutions give you a competitive edge in today’s digital marketplace.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "SEO Optimization",
    tagline: "Rank higher, get found, grow faster.",
    desc: "At Jocodey, we deliver SEO strategies that boost search rankings, improve visibility, and attract qualified traffic. Our tailored solutions—from keyword optimization to technical SEO—help you achieve sustainable online success.",
  },
  {
    icon: ChartBarIcon,
    title: "Digital Marketing",
    tagline: "Marketing that drives real results.",
    desc: "At Jocodey, we create results-driven digital marketing campaigns that amplify your brand’s presence online. Our strategies build awareness, engage customers, and deliver measurable business growth.",
  },
  {
    icon: CloudIcon,
    title: "Hosting & Domains",
    tagline: "Reliable hosting. Hassle-free domains.",
    desc: "At Jocodey, we provide secure web hosting and hassle-free domain registration. Our reliable solutions give you the foundation to build, launch, and grow your digital presence with confidence.",
  },
  {
    icon: UserGroupIcon,
    title: "Consulting Services",
    tagline: "Smart strategies for modern businesses.",
    desc: "At Jocodey, we combine expertise and innovation to provide consulting solutions that solve complex challenges. Our tailored strategies help businesses adopt technology effectively and unlock new growth opportunities.",
  },
];

export default function ServiceSection() {
  return (
    <section className="services-section section-padding" id="services">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="section-title text-center mb-12">
          <h6 className="sub-title text-primary">What We Provide</h6>
          <h2 className="text-3xl font-bold">Our Services</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="single-services-item"
              >
                <div className="services-icon">
                  <Icon className="w-12 h-12" />
                </div>
                <h3>{service.title}</h3>
                <p className="text-sm text-gray-600 italic mb-3">
                  {service.tagline}
                </p>
                <p>{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
