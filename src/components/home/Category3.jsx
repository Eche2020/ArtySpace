import React from "react";
import Yoko1 from "../../assets/Yoko1.avif";
import Yoko2 from "../../assets/Yoko2.avif";
import Yoko3 from "../../assets/Yoko3.avif";
import { Link } from "react-router-dom";

export default function Category3() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
        <div className="container py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          {/* Grid – single column on mobile, two columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* IMAGE 1 CARD — relative container for the absolute number */}
            <div
              data-aos="fade-down"
              className="flex flex-col items-center text-center relative"
            >
              {/* Main image – responsive with aspect ratio */}
              {/* TODO: refine alt text */}
              <img
                src={Yoko1}
                alt="Portrait of model Yoko Yamada from a fashion editorial shot in Lagos"
                className="w-full max-w-[600px] h-auto aspect-[3/4] object-cover
                     ml-0 lg:ml-20"
              />

              {/* Number 03 – absolute on desktop, relative on mobile */}
              <div className="relative lg:absolute top-0 lg:top-14 left-0 lg:left-10 z-10 text-center lg:text-left mb-4 lg:mb-0">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-midnight drop-shadow-2xl ml-0 lg:ml-4">
                  03
                </h1>
              </div>
            </div>

            {/* IMAGE 2 CARD */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col items-center text-center gap-6 lg:gap-10"
            >
              {/* Model info – centred on mobile, offset on desktop */}
              <div
                data-aos="fade-up"
                className="relative p-2 text-center lg:text-left lg:left-[7.5rem]"
              >
                <h3 className="text-sm font-medium">Model: Yoko Yamada</h3>
                <h3 className="text-sm font-medium">MUA: Jessie Gein</h3>
              </div>

              {/* First image block – responsive container */}
              <div className="relative w-full max-w-[384px]">
                <img
                  src={Yoko2}
                  alt="Model Yoko Yamada posing in soft natural light"
                  className="w-full h-auto aspect-[48/35] object-cover"
                />
              </div>

              {/* Second image block */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative w-full max-w-[384px]"
              >
                <img
                  src={Yoko3}
                  alt="Model Yoko Yamada photographed for the 'Something in the Air' series"
                  className="w-full h-auto aspect-[48/35] object-cover"
                />
              </div>

              {/* Bottom text – centred on mobile, right‑aligned on desktop */}
              <div
                data-aos="fade-up"
                className="relative p-2 text-center lg:text-right lg:right-28"
              >
                <p className="font-bold text-midnight">SOMETHING IN THE AIR</p>
                <Link to="/shop" className="underline text-sm">
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
