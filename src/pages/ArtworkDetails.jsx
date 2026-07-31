import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams, Link } from "react-router-dom";
import { artworks } from "../data/artworks.js";
import { useCart } from "../context/CartContext";

export default function ArtworkDetails() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50, //Trigger slightly earlier
      disable: false,
    });

    // Refresh calculations after react paints the DOM
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.classList.remove("aos-animate");
      });
    };
  }, []);
  const { id } = useParams();
  const art = artworks.find((a) => a.id === Number(id));
  const { addToCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedMedium, setSelectedMedium] = useState(null);

  if (!art) {
    return <div className="p-6">Artwork not found.</div>;
  }

  const handleAddToCart = () => {
    const itemToAdd = {
      ...art,
      selectedSize,
      selectedFrame,
      selectedMedium,
    };
    addToCart(itemToAdd);
    setAddedItem(itemToAdd);
    setShowModal(true);
  };

  return (
    <>
      {/* Main Artwork Detail Card */}
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-down"
          data-aos-delay="200"
          className="max-w-5xl mx-auto w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Grid – single column on mobile, two columns on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative bg-linear-to-br from-gray-200 to-gray-100 p-4 sm:p-6 flex items-center justify-center">
                <div className="relative group w-full max-w-xs sm:max-w-sm">
                  <img
                    src={art.images[0]}
                    alt={art.title}
                    className=" w-full h-auto object-cover shadow-lg transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow text-xs font-medium text-gray-700">
                      🔍 Zoom
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-5 lg:p-6 flex flex-col justify-center">
                {/* Title – responsive text size */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent mb-2">
                  {art.title}
                </h1>

                {/* Artist Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-950 to-gray-400 flex items-center justify-center text-white font-bold text-xs">
                    RA
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {art.Artist}
                    </p>
                    <p className="text-xs text-gray-500">Contemporary Artist</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  {art.description}
                </p>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ₦{art.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ₦{(art.price * 1.2).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    ✓ Free shipping
                  </p>
                </div>

                {/* Size Selection – 2 columns on tiny screens, 3 on sm+ */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    📐 Select Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {art.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                          selectedSize === size
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 hover:border-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frame Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    🖼️ Frame Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {art.frames.map((frame) => (
                      <button
                        key={frame}
                        type="button"
                        onClick={() => setSelectedFrame(frame)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                          selectedFrame === frame
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 hover:border-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {frame}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Medium Selection */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    🖌️ Medium
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {art.mediums.map((medium) => (
                      <button
                        key={medium}
                        type="button"
                        onClick={() => setSelectedMedium(medium)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                          selectedMedium === medium
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 hover:border-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {medium}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-linear-to-r from-gray-900 to-gray-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:shadow-md hover:from-gray-800 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    🛒 Add to Cart
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center text-xl">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Add Confirmation Modal – already responsive, no big changes needed */}
      {showModal && addedItem && (
        <div
          data-aos="fade-down"
          data-aos-delay="200"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
              Added to Cart!
            </h2>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl mb-6">
              <img
                src={addedItem.images[0]}
                alt={addedItem.title}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {addedItem.title}
                </p>
                <p className="text-xs text-gray-500">Razak</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  ₦{addedItem.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Continue Shopping
              </button>
              <Link
                to="/cart"
                className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium text-center hover:bg-gray-800 transition-colors text-sm"
              >
                View Cart 🛒
              </Link>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
