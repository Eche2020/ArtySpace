import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        ArtySpace
      </Link>
      <div className="space-x-6 text-sm font-medium">
        <Link to="/shop" className="hover:text-black">
          Shop
        </Link>
        <Link to="/cart" className="hover:text-black">
          Cart
        </Link>
        <Link to="/contact" className="hover:text-black">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
