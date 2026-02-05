// "use client";

// import { submitContactForm } from "@/app/contact/actions";
// import { FormEvent, useState } from "react";

// export default function FormSection() {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setStatus(null);

//     const formData = new FormData(e.currentTarget);

//     const result = await submitContactForm(formData);
//     setStatus(result.message);
//     setLoading(false);
//     e.currentTarget.reset();
//   }

//   return (
//     <div className="contact-section section-padding">
//       <div className="container mx-auto p-4">
//         <div className="section-title">
//           <h6 className="sub-title">Let's Talk</h6>
//           <h2>Contact Us</h2>
//         </div>

//         <div className="flex flex-wrap items-center">
//           <div className="w-full lg:w-10/12 lg:mx-auto">
//             <div className="contact-form">
//               <p className="form-message"></p>
//               <form
//                 id="contact-form"
//                 className="contact-form form"
//                 onSubmit={handleSubmit}
//               >
//                 <div className="flex flex-wrap -mx-3">
//                   {/* Name */}
//                   <div className="w-full md:w-1/2 px-3">
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         required
//                         placeholder="Your Name"
//                       />
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div className="w-full md:w-1/2 px-3">
//                     <div className="form-group">
//                       <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         className="form-control"
//                         required
//                         placeholder="Your Email"
//                       />
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="w-full md:w-1/2 px-3">
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         name="phone"
//                         id="phone"
//                         className="form-control"
//                         required
//                         placeholder="Your Phone"
//                       />
//                     </div>
//                   </div>

//                   {/* Subject */}
//                   <div className="w-full md:w-1/2 px-3">
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         name="subject"
//                         id="subject"
//                         className="form-control"
//                         required
//                         placeholder="Your Subject"
//                       />
//                     </div>
//                   </div>

//                   {/* Message */}
//                   <div className="w-full px-3">
//                     <div className="form-group">
//                       <textarea
//                         name="message"
//                         className="form-control"
//                         id="message"
//                         cols={30}
//                         rows={6}
//                         placeholder="Your Message"
//                       ></textarea>
//                     </div>
//                   </div>

//                   {/* Buttons */}
//                   <div className="w-full px-3">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       id="loader"
//                       className="default-btn submit-btn"
//                     >
//                       {loading ? "Sending..." : "Send Message"}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { submitContactForm } from "@/app/contact/actions";
import { showError, showSuccess } from "@/utils/toast";
import { useState, FormEvent } from "react";
import { FaSpinner } from "react-icons/fa";

export default function FormSection() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.currentTarget);

    const result = await submitContactForm(formData);
    if (result.success) {
      showSuccess(result.message);
      form.reset();
    } else {
      showError(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="contact-section section-padding">
      <div className="container mx-auto p-4">
        <div className="section-title">
          <h6 className="sub-title">Let's Talk</h6>
          <h2>Contact Us</h2>
        </div>

        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-10/12 lg:mx-auto">
            <div className="contact-form">
              <form onSubmit={handleSubmit} className="contact-form form">
                <div className="flex flex-wrap -mx-3">
                  {/* Name */}
                  <div className="w-full md:w-1/2 px-3 mt-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="form-control"
                    />
                  </div>

                  {/* Email */}
                  <div className="w-full md:w-1/2 px-3 mt-4">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      className="form-control"
                    />
                  </div>

                  {/* Phone */}
                  <div className="w-full md:w-1/2 px-3 mt-4">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Your Phone"
                      className="form-control"
                    />
                  </div>

                  {/* Subject */}
                  <div className="w-full md:w-1/2 px-3 mt-4">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Your Subject"
                      className="form-control"
                    />
                  </div>

                  {/* Message */}
                  <div className="w-full px-3 mt-4">
                    <textarea
                      name="message"
                      rows={6}
                      required
                      placeholder="Your Message"
                      className="form-control"
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="w-full px-3 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="default-btn submit-btn cursor-pointer !min-w-[200px] !flex !items-center !justify-center"
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin h-6 w-6 font-semibold" />
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
