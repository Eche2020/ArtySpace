import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutMe1() {
  return (
    <div className="min-h-screen bg-gray-200 text-midnight py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 md:gap-16">
        {/* LEFT COLUMN – Bio & CTA */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-midnight">
              Razak is a fashion photographer based in Lagos, Nigeria. He
              started working for small indie publications back in the mid-00s,
              and gathered a following that slowly attracted the attention of
              bigger brands.
            </p>
            <p className="text-lg leading-relaxed text-midnight">
              Razak has worked on a wide array of different projects. Available
              to work worldwide.
            </p>
            <a
              href="#"
              className=" text-lg font-semibold text-midnight border-b-2 border-gray-900 hover:border-gray-400 transition-colors duration-300 self-start"
            >
              CLIENT LIST &rarr;
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN – Exhibitions */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex-1 flex flex-col justify-between"
        >
          <h2 className="text-3xl md:text-4xl tracking-wide mb-8">
            EXHIBITIONS
          </h2>

          <ul className="space-y-8">
            <li>
              <p className="text-xl font-medium">THIS IS LINAS: ORIGIN STORY</p>
              <p className="text-gray-400 mt-1">2008, Amsterdam</p>
            </li>
            <li>
              <p className="text-xl font-medium">TAKES ON COLOR AND SEA</p>
              <p className="text-gray-400 mt-1">2010, London and Amsterdam</p>
            </li>
            <li>
              <p className="text-xl font-medium">EXPRESSIONS OF MORTALITY</p>
              <p className="text-gray-400 mt-1">2011, Amsterdam</p>
            </li>
            <li>
              <p className="text-xl font-medium">
                THOEMKE &amp; GEET: EXPLORING
              </p>
              <p className="text-gray-400 mt-1">
                2015-2016, Amsterdam and Paris
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
