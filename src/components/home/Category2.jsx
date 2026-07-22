import React from "react";
import Image1 from "../../assets/nature01.jpg";
import Image2 from "../../assets/about4.jpg";
import Image3 from "../../assets/shoe02.jpg";
import { Link } from "react-router-dom";

export default function Category2() {
  return (
    <>
      <div className="bg-midnight text-white shadow-sm flex items-center justify-center min-h-screen relative overflow-hidden">
        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          {/* Number 02 – absolute on desktop, relative on mobile */}
          <div className="relative lg:absolute top-0 lg:top-[3.75rem] left-0 lg:left-10 z-10 text-center lg:text-left mb-4 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl ml-0 lg:ml-4">
              02
            </h1>
          </div>

          {/* Grid – single column on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0.5 items-center">
            {/* IMAGE 1 CARD – relative container to control absolute child */}
            <div
              data-aos="fade-down"
              className="flex flex-col items-center text-center relative"
            >
              <div data-aos="fade-down" className="mt-4 text-white p-2">
                <h3 className="text-lg font-semibold">Location: Lagos</h3>
                <p className="text-sm">Name: Elegance</p>
                <Link to="/shop" className="underline">
                  Learn more about this image
                </Link>
              </div>

              {/* Main image */}
              <div data-aos="fade-down" data-aos-delay="200">
                <img
                  src={Image1}
                  alt=""
                  className="w-full max-w-[400px] h-auto aspect-[10/13] object-cover
                       mb-4 ml-0 lg:mb-[7.5rem] lg:ml-[5rem]"
                />
              </div>

              {/* Overlapping image – absolute only on large screens */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative lg:absolute top-0 lg:top-40 left-0 lg:left-10 w-full flex justify-center lg:block"
              >
                <img
                  src={Image3}
                  alt=""
                  className="w-full max-w-[280px] h-auto aspect-[7/8] object-cover drop-shadow-2xl"
                />
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
                className="w-full max-w-[480px] h-auto aspect-[12/17] object-cover
                     mt-4 sm:mt-6 lg:mt-10"
              />
              <div data-aos="fade-up" className="mt-4 text-white p-2">
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
