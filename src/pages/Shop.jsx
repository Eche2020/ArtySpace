import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { artworks } from "../data/artworks";
import ArtworkCard from "./ArtworkCard";

function Shop() {
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
    <div className="bg-stone-50 min-h-screen">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    {/* Elegant heading with decorative line */}
    <div className="text-center mb-10 sm:mb-16">
      <h1
        data-aos="fade-up"
        className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-stone-800"
      >
        Discover Art
      </h1>
      <div
        data-aos="fade-up"
        className="mt-4 sm:mt-6 mx-auto w-24 h-0.5 bg-amber-600/60"
      />
      <p
        data-aos="fade-up"
        className="mt-3 sm:mt-4 text-stone-500 text-base sm:text-lg max-w-xl mx-auto px-2"
      >
        Original works curated for collectors and enthusiasts
      </p>
    </div>

    {/* Artwork Grid */}
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
      data-aos="fade-up"
    >
      {artworks.map((art) => (
        <ArtworkCard key={art.id} art={art} />
      ))}
    </div>
  </div>
</div>
  );
}

export default Shop;
