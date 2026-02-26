import React from "react";
import { Link } from "react-router-dom";

function ArtworkCard({ art }) {
  return (
    <Link
      to={`/art/${art.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
    >
      <img
        src={art.images[0]}
        alt={art.title}
        className="w-full h-72 object-cover hover:scale-105 transition duration-300"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">{art.title}</h3>
        <p className="text-gray-600 mt-2">₦{art.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

export default ArtworkCard;
