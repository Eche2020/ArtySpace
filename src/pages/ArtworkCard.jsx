import React from "react";
import { Link } from "react-router-dom";

function ArtworkCard({ art }) {
  return (
    <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition">
      <img
        src={art.images[0]}
        alt={art.title}
        loading="lazy"
        className="w-full h-96 object-cover hover:scale-105 transition duration-300"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">{art.title}</h3>
        <p>{art.Artist}</p>
        <p className="text-gray-600 mt-2">₦{art.price.toLocaleString()}</p>
        <Link
          to={`/art/${art.id}`}
          className="text-blue-500 mt-2 inline-block hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ArtworkCard;
