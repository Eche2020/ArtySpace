import React from "react";
import Image1 from "../../assets/about3.jpg";
import Image2 from "../../assets/nature2.jpg";
import { Link } from "react-router-dom";

export default function Category1() {
  return (
    <>
   <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
  <div className="container py-8 px-4 sm:px-6 lg:px-8">
    {/* Stack on mobile, 2 columns on large screens */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

      {/* IMAGE 1 CARD — relative for absolute "01" */}
      <div
        data-aos="fade-down"
        className="flex flex-col items-center text-center relative"
      >
        <div data-aos="fade-down" className="mt-4 text-midnight p-2">
          <h3 className="text-lg font-semibold">Location: Lagos</h3>
          <p className="text-sm">Name: Elegance</p>
          <Link to="/shop" className="underline">
            Learn more about this image
          </Link>
        </div>

        {/* Fixed sizes replaced: max-w + aspect-ratio */}
        <img
          src={Image1}
          alt=""
          className="w-full max-w-[600px] h-auto aspect-[3/4] object-cover"
        />

        {/* Absolute "01" — responsive position and size */}
        <div className="absolute top-4 sm:top-8 md:top-24 lg:top-36 left-2 sm:left-4 lg:left-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl ml-4">
            01
          </h1>
        </div>
      </div>

      {/* IMAGE 2 CARD */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="flex flex-col items-center text-center"
      >
        <img
          src={Image2}
          alt=""
          className="w-full max-w-[420px] h-auto aspect-[7/8] object-cover"
        />

        <div data-aos="fade-up" className="mt-4 text-midnight p-2">
          <h3 className="text-lg font-semibold">Location: Abuja</h3>
          <p className="text-sm opacity-80">Name: Royal Form</p>
          <Link to="/shop" className="underline">
            Learn more about this image
          </Link>
        </div>
      </div>

    </div>
  </div>
</div>
    </>
  );
}
