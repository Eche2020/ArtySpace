import React from "react";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-700 rounded-xl text-white text-xl">
            <h1>ArtySpace</h1>
          </div>
          <p className="text-sm md:text-base text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-xl">
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-110 duration-200 "
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
    </footer>
  );
}
