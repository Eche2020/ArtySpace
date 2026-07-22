import React from "react";
import { Link } from "react-router-dom";

import heroBg from "../assets/about5.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroSection() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Top section – headings stack on mobile, row on desktop */}
      <div
        data-aos="fade-in"
        data-aos-delay="200"
        className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-start px-4 md:px-16 pt-6 md:pt-12"
      >
        <h3 className="text-sm md:text-base text-white tracking-wide drop-shadow-md text-center">
          CREATIVE PROFESSIONAL
        </h3>
        <h3 className="text-sm md:text-base text-white tracking-wide drop-shadow-md text-center">
          EXPERIENCED & FLEXIBLE
        </h3>
        <h3 className="text-sm md:text-base text-white tracking-wide drop-shadow-md text-center">
          IMPRESSIVE CLIENTELE
        </h3>
      </div>

      {/* Center content – h1 and underlined link */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4"
      >
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-white drop-shadow-xl leading-tight">
          RAZAK COLLECTIONS
        </h1>
        <Link
          to="/contact"
          className="mt-6 md:mt-8 inline-block text-xl md:text-2xl text-white underline underline-offset-8 decoration-2 hover:text-gray-200 transition-colors duration-300 font-medium"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
