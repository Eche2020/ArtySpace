import React from "react";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import About1 from "../assets/about1.jpg";
import About2 from "../assets/about2.jpg";
import About3 from "../assets/about3.jpg";
import AboutMe1 from "./AboutMe1";
import AboutMe2 from "./AboutMe2";

const AboutPage = () => {
  useEffect(() => {
    // Re-initialize and refresh AOS every time this component mounts
    AOS.init({
      duration: 800,
      once: true, // Only animate once (prevents re-hiding on scroll)
      offset: 50, // Trigger slightly earlier
      disable: false,
    });

    // CRITICAL: Refresh calculations after React paints the DOM
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Optional: clean up AOS classes to prevent ghost states
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.classList.remove("aos-animate");
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-midnight relative overflow-hidden">
      <div className="container mx-auto py-8 px-4 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* LEFT SECTION - Large Image */}
          <div className="order-2 lg:order-1">
            <img
              src={About3}
              alt="Main gallery showcase"
              data-aos="fade-right"
              loading="eager" // Critical: load immediately since it's above the fold
              className="w-full h-auto min-h-75 lg:h-125 object-cover bg-gray-800"
            />
          </div>

          {/* RIGHT SECTION */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            {/* Upper Part - Two Small Images */}
            <div className="flex gap-4">
              <img
                src={About2}
                alt="Gallery preview 1"
                data-aos="fade-up"
                loading="lazy"
                className="w-1/2 h-48 object-cover bg-gray-800"
              />
              <img
                src={About1}
                alt="Gallery preview 2"
                data-aos="fade-down"
                data-aos-delay="200"
                loading="lazy"
                className="w-1/2 h-48 object-cover bg-gray-800"
              />
            </div>

            {/* Lower Part - Heading and Text */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-center px-4"
            >
              <h1 
               data-aos="fade-up"
                data-aos-delay="200"
              className="text-4xl md:text-5xl lg:text-6xl text-white text-start tracking-tight leading-tight drop-shadow-lg">
                Capturing magic
              </h1>

              <p
                data-aos="zoom-in"
                data-aos-delay="300"
                className="text-white p-5 tracking-tight leading-tight drop-shadow-lg"
              >
                RAZAK GALLERY | NIGERIA
              </p>
            </div>
          </div>
        </div>
      </div>
      <AboutMe1 />
      <AboutMe2 />
    </div>
  );
};

export default AboutPage;
