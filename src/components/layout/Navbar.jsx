import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/cart", label: "Cart" },
    { to: "/AboutMe", label: "About Me" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    // `header` landmark; sticky positioning kept here so it behaves exactly as before
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Main navigation"
        className="bg-midnight text-white shadow-sm px-6 md:px-12 lg:px-20 py-3 flex justify-between items-center"
      >
        {/* Logo */}
        <Link
          to="/"
          data-aos="fade-down"
          data-aos-delay="200"
          className="text-2xl md:text-3xl font-light tracking-wide"
          onClick={closeMenu}
        >
          ArtySpace
        </Link>

        {/* Desktop Links - Horizontal */}
        <div
          data-aos="fade-down"
          data-aos-delay="200"
          className="hidden md:flex space-x-6 text-sm font-light"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="border-b-2 border-transparent hover:border-blue-500 transition duration-300 text-sm py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Button - Mobile Only */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Menu - Vertical Dropdown */}
        <div
          id="mobile-menu"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`absolute top-full left-0 w-full bg-midnight shadow-lg md:hidden flex flex-col items-center py-6 space-y-5 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className="border-b-2 border-transparent hover:border-blue-500 transition duration-300 text-base py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
