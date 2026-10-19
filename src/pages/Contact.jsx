import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import About1 from "../assets/about1.jpg";
import About2 from "../assets/about2.jpg";
import About3 from "../assets/about3.jpg";
import Contact1 from "./Contact1";

export default function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50, //Trigger slightly earlier
      disable: false,
    });

    // Refresh calculations after react paints the DOM
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.classList.remove("aos-animate");
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-midnight relative overflow-hidden">
      <div className="container mx-auto py-1 px-1 sm:px-2 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[80vh]">
          {/* LEFT SECTION – Large Image (order swapped for mobile stacking) */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <div className="flex gap-4 sm:gap-6 justify-center lg:justify-start flex-wrap sm:flex-nowrap">
              {/* TODO: refine alt text */}
              <img
                src={About2}
                alt="Artwork by Razak Collections"
                data-aos="fade-up"
                loading="lazy"
                className="w-full max-w-[192px] h-auto aspect-[6/5] object-cover bg-gray-800"
              />
              {/* TODO: refine alt text */}
              <img
                src={About1}
                alt="Artwork by Razak Collections"
                data-aos="fade-down"
                data-aos-delay="200"
                loading="lazy"
                className="w-full max-w-[192px] h-auto aspect-[6/5] object-cover bg-gray-800"
              />
            </div>
          </div>

          {/* The right column (if you have content there) would go here */}
          {/* If the original design had something, it’s missing in the snippet; 
          add it with the same responsive pattern. */}
        </div>

        {/* Contact information – huge text made responsive */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-200 px-4"
        >
          <h1 className="underline">+3145683245</h1>
          <h1 className="underline">thoemke@Example.com</h1>
        </div>

        {/* Contact1 component – wrap with responsive container if needed */}
        <Contact1 />
      </div>
    </div>
  );
}
