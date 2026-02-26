import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      {/* Dark gradient + blur overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Artistic radial glow */}
      <div className="absolute inset-0 bg-linear-to-tr from-purple-900/40 via-transparent to-blue-900/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
          Discover Something Extraordinary
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
          Curated collections crafted to elevate your style and bring modern
          aesthetics into everyday living.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-8 px-8 py-3 text-lg font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
