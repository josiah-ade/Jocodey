import { whatsAppLink } from "@/utils/whatsapp";
import React from "react";

const HireSection: React.FC = () => {
  return (
    <section className="hire-section">
      <div className="container mx-auto px-4">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-12">
            <div className="hire-content">
              <h6 className="sub-title">Want to work with us?</h6>
              <h2>Digitally Transform & Grow Your Business</h2>
              <div className="hire-btn">
                <a className="default-btn" href={whatsAppLink()}>
                  Message Us Now<span></span>
                </a>
                <a className="default-btn-one" href="/contact">
                  Contact Us<span></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireSection;
