import React from "react";
import { artworks } from "../data/artworks";
import ArtworkCard from "../components/ArtworkCard";

function Shop() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Discover Art</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {artworks.map((art) => (
          <ArtworkCard key={art.id} art={art} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
