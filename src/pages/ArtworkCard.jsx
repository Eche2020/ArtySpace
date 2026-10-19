import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSingleOrderLink } from "../utils/whatsapp";
import { useCart } from "../context/CartContext";

/**
 * Shop grid card.
 *
 * The whole card is a <Link> to the detail page. Inner controls (Add to Cart /
 * quick WhatsApp order) call e.preventDefault() + e.stopPropagation() so they
 * never trigger navigation.
 */
function ArtworkCard({ art }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // Brief "Added" confirmation, reset automatically (and cleaned up on unmount)
  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  // Descriptive alt text – describes the picture, not the SKU
  const altText = art.description
    ? `${art.title}: ${art.description}`
    : `${art.title} — fine art print by ${art.Artist}`;

  // Subtitle tier: dimensions · year (medium falls back if no dimensions exist)
  const subtitle =
    [art.dimensions, art.year].filter(Boolean).join(" · ") ||
    art.mediums?.[0] ||
    "";

  const handleAddToCart = (event) => {
    // Must not bubble to the wrapping <Link>
    event.preventDefault();
    event.stopPropagation();
    addToCart(art);
    setAdded(true);
  };

  const handleQuickOrder = (event) => {
    // Must not bubble to the wrapping <Link>
    event.preventDefault();
    event.stopPropagation();
    window.open(getSingleOrderLink(art), "_blank", "noopener,noreferrer");
  };

  return (
    <Link
      to={`/art/${art.id}`}
      aria-label={`View details for ${art.title} by ${art.Artist}`}
      className="group block bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Fixed ratio keeps every card in the grid aligned; gentle zoom on hover */}
      <div className="relative overflow-hidden aspect-[3/4] bg-stone-100">
        <img
          src={art.images[0]}
          alt={altText}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay – one restrained affordance, nothing that competes */}
        <div className="absolute inset-0 flex items-center justify-center bg-midnight/0 group-hover:bg-midnight/35 transition-colors duration-300">
          <span className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border border-white/70 text-white text-sm tracking-wide px-5 py-2 rounded-full backdrop-blur-sm">
            View Details
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
          {art.Artist}
        </p>
        <h3 className="text-lg font-semibold text-stone-800 mt-1">
          {art.title}
        </h3>
        {subtitle && (
          <p className="text-sm text-stone-500 mt-1">{subtitle}</p>
        )}

        <p className="mt-3 text-stone-800 font-medium">
          ₦{art.price.toLocaleString()}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${art.title} to cart`}
            className="flex-1 bg-midnight text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-stone-800 transition-colors duration-300"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

          <button
            type="button"
            onClick={handleQuickOrder}
            aria-label={`Order ${art.title} on WhatsApp`}
            className="w-11 h-11 shrink-0 rounded-xl border border-stone-200 text-stone-600 hover:border-stone-900 hover:bg-stone-50 transition-colors duration-300 flex items-center justify-center"
          >
            {/* Inline SVG – no icon library added */}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ArtworkCard;
