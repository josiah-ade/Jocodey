"use client";

const features = [
  "Expertise Across Multiple Disciplines",
  "Tailored Solutions",
  "Skilled Team of Professionals",
  "Cutting-Edge Technology",
  "Proven Track Record",
  "Exceptional Customer Service",
];

export default function OverviewSection() {
  return (
    <section className="overview-section section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          {/* Left Image */}
          <div>
            <div className="overview-image">
              <img src="/img/pp/office.jpg" alt="Overview" />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="overview-content">
              <h6 className="sub-title">Why Choose Us?</h6>
              <h2>
                Our commitment is simple: to help you unlock opportunities,
                achieve measurable growth, and stay ahead in the digital
                landscape.
              </h2>
              <p>
                At Jocodey, we are driven by a commitment to innovation,
                excellence, and client success. Here's why we are the trusted
                choice for forward-thinking businesses:
              </p>

              {/* Features List */}
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li key={index}>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
