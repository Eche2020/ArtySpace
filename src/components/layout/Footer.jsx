import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

export default function Footer() {
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
    <div className="w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section – stacks on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left w-full sm:w-auto">
          <p
            data-aos="fade-down"
            data-aos-delay="200"
            className="text-gray-400 text-sm sm:text-base"
          >
            © {new Date().getFullYear()} All rights reserved
          </p>
          <div className="p-2 rounded-xl text-white text-sm sm:text-base">
            <h1>ArtySpace</h1>
          </div>

          {/* Desktop: ml-10; mobile: no excessive margin */}
          <p className="ml-0 sm:ml-4 md:ml-10 text-sm sm:text-base">
            THOEMKE@LINAS.COM
          </p>
        </div>

        {/* Social Links – scales down a bit on very small screens */}
        <div
          data-aos="fade-down"
          data-aos-delay="200"
          className="flex items-center gap-6 text-xl sm:text-2xl"
        >
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-110 duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://youtube.com/@yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-transform transform hover:scale-110 duration-200"
          >
            <FaYoutube />
          </a>
          <a
            href="https://facebook.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-110 duration-200"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </div>
  );
}
