"use client";

interface PortfolioItem {
  img: string;
  title: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    img: "/img/portfolio/1.png",
    title: "E-commerce Website",
  },
  {
    img: "/img/portfolio/2.png",
    title: "Multi-National Classified Ads Website",
  },
  {
    img: "/img/portfolio/5.png",
    title: "Dating Website/App",
  },
  {
    img: "/img/portfolio/6.png",
    title: "News Website/Blog",
  },
  {
    img: "/img/portfolio/7.png",
    title: "Finance Website",
  },
];

export default function PortfolioSection() {
  return (
    <section className="portfolio-area bg-grey section-padding" id="portfolio">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="grid">
          <div>
            <div className="section-title">
              <h6 className="sub-title">Recent Works</h6>
              <h2>Our Portfolio</h2>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-grid-item">
                <div className="portfolio-item relative overflow-hidden rounded-lg shadow-lg group border-4 border-gray-300">
                  {/* Image with hover scroll */}
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:-translate-y-full transition-transform duration-[6000ms] ease-linear"
                    />
                  </div>

                  {/* Overlay title */}
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-3 duration-500">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}