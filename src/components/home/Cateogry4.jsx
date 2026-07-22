import React from "react";
import model1 from "../../assets/model1.avif";
import model2 from "../../assets/model2.avif";
import model3 from "../../assets/model3.avif";

import { Link } from "react-router-dom";

export default function Category4() {
  return (
    <>
      <div className="bg-yellow-400 text-white shadow-sm flex items-center justify-center min-h-screen relative overflow-hidden">
        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          {/* Number 04 – absolute on desktop, relative on mobile */}
          <div className="relative lg:absolute top-0 lg:top-[3.75rem] left-0 lg:left-10 z-10 text-center lg:text-left mb-4 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-midnight drop-shadow-2xl ml-0 lg:ml-4">
              04
            </h1>
          </div>

          {/* Grid – single column on mobile, two on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0.5 items-center">
            {/* IMAGE 1 CARD */}
            <div
              data-aos="fade-down"
              className="flex flex-col items-center text-center relative"
            >
              {/* First image + text block */}
              <div data-aos="fade-down" data-aos-delay="200">
                <img
                  src={model3}
                  alt=""
                  className="w-full max-w-[400px] h-auto aspect-[10/13] object-cover
                       mb-4 lg:mb-30 ml-0 lg:ml-20"
                />
                <p className="text-midnight">
                  YELLOW Learn more about the project →
                </p>
              </div>

              {/* Overlapping image – absolute only on desktop */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative lg:absolute top-0 lg:top-40 left-0 lg:left-10 w-full flex flex-col items-center lg:block"
              >
                <img
                  src={model1}
                  alt=""
                  className="w-full max-w-[280px] h-auto aspect-[7/8] object-cover drop-shadow-2xl
                       mt-4 lg:mt-0 lg:relative lg:top-20"
                />
                <p className="text-gray-900 z-10 pt-2 lg:relative lg:top-20">
                  Model: Anna Fena
                </p>
              </div>
            </div>

            {/* IMAGE 2 CARD */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col items-center text-center"
            >
              <img
                src={model2}
                alt=""
                className="w-full max-w-[480px] h-auto aspect-[12/17] object-cover
                     mt-4 sm:mt-6 lg:mt-10"
              />

              <div
                data-aos="fade-up"
                className="relative z-10 text-midnight p-2 mt-4 lg:mt-0 lg:bottom-25 text-center lg:text-left"
              >
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
