// "use client";

// import Socials from "@/components/common/layout/Socials";
// import { whatsAppLink } from "@/utils/whatsapp";
// import Link from "next/link";
// import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";

// export default function HeroSection() {
//   return (
//     <section className="home-section">
//       <div className="d-table">
//         <div className="d-table-cell">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-col lg:flex-row items-center">
//               {/* Left Content */}
//               <div className="w-full lg:w-1/2">
//                 <div className="main-banner-content">
//                   {/* <Socials /> */}
//                   <h1 className="text-3xl md:text-4xl font-bold mb-4">
//                     Jocodey Digital - Web Development & IT Solution
//                   </h1>
//                   <p className="mb-6">
//                     We design and build powerful websites, apps, and digital
//                     strategies that help businesses grow, stand out, and succeed
//                     online.
//                   </p>
//                   <div className="banner-btn flex gap-4">
//                     <a className="default-btn-one" href={whatsAppLink()}>
//                       Message Us Now<span></span>
//                     </a>
//                     <Link className="default-btn-two" href="/contact">
//                       Contact Us <span></span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Image */}
//               <div className="w-full lg:w-1/2 mt-8 lg:mt-0" data-tilt>
//                 <div className="banner-image">
//                   <img
//                     src="/img/pp/home-font.png"
//                     alt="image"
//                     className="mx-auto"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Decorative Shape */}
//       <div className="creative-shape">
//         <img src="/img/home-bottom-shape.png" alt="svg shape" />
//       </div>
//     </section>
//   );
// }

"use client";

import { whatsAppLink } from "@/utils/whatsapp";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="home-section relative">
      {/* Mobile background image layer */}
      <div className="absolute inset-0 lg:hidden z-[1]">
        <img
          src="/img/pp/home-font.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile overlay */}
      <div className="absolute inset-0 bg-black/60 lg:hidden z-[2]" />

      {/* Content */}
      <div className="relative z-[3] d-table w-full">
        <div className="d-table-cell">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left Content */}
              <div className="w-full lg:w-1/2 text-white lg:text-black">
                <div className="main-banner-content">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Jocodey Digital - Web Development & IT Solution
                  </h1>
                  <p className="mb-6">
                    We design and build powerful websites, apps, and digital
                    strategies that help businesses grow, stand out, and succeed
                    online.
                  </p>
                  <div className="banner-btn flex gap-4">
                    <a className="default-btn-one" href={whatsAppLink()}>
                      Message Us Now<span></span>
                    </a>
                    <Link className="default-btn-two" href="/contact">
                      Contact Us <span></span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Image (desktop only) */}
              <div
                className="hidden lg:block w-full lg:w-1/2 mt-8 lg:mt-0"
                data-tilt
              >
                <div className="banner-image">
                  <img
                    src="/img/pp/home-font.png"
                    alt="image"
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Shape */}
      <div className="creative-shape relative z-[4]">
        <img src="/img/home-bottom-shape.png" alt="svg shape" />
      </div>
    </section>
  );
}
