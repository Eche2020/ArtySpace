import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams, Link } from "react-router-dom";
import { artworks } from "../data/artworks.js";
import { useCart } from "../context/CartContext";
import ArtworkCard from "./ArtworkCard";

// Trust signals – inline SVG only (no icon library added)
const trustSignals = [
  {
    label: "Free shipping",
    path: "M3 7.5h11v8H3zM14 10.5h3.6l2.4 2.6v2.4h-6z",
    extra: (
      <>
        <circle cx="7" cy="17.5" r="1.6" />
        <circle cx="17" cy="17.5" r="1.6" />
      </>
    ),
  },
  {
    label: "Certificate of authenticity",
    path: "M12 3l7 2.6v5.2c0 4.4-2.9 7.5-7 8.9-4.1-1.4-7-4.5-7-8.9V5.6L12 3z",
    extra: <path d="M9 11.8l2.1 2.1L15 9.9" />,
  },
  {
    label: "30-day returns",
    path: "M20.5 12a8.5 8.5 0 1 1-2.6-6.1",
    extra: <path d="M20.5 4.5v5h-5" />,
  },
];

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
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Lightbox: Escape to close + lock background scroll while open
  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  if (!art) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-light text-stone-800">
            Artwork not found.
          </h1>
          <p className="text-stone-500 mt-2 mb-8">
            That piece may have been sold or moved.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = art.images ?? [];
  const currentImage = images[activeImage] ?? images[0];
  const altText = art.description
    ? `${art.title}: ${art.description}`
    : `${art.title} — fine art print by ${art.Artist}`;

  // Same-category works first, then whatever else, never the current piece
  const related = [
    ...artworks.filter((a) => a.id !== art.id && a.category === art.category),
    ...artworks.filter((a) => a.id !== art.id && a.category !== art.category),
  ].slice(0, 4);

  // Only render a spec row when the data actually exists
  const specs = [
    art.dimensions && { label: "Dimensions", value: art.dimensions },
    art.mediums?.length && {
      label: "Medium",
      value: selectedMedium || art.mediums.join(" / "),
    },
    art.year && { label: "Year", value: art.year },
    art.editionSize && {
      label: "Edition",
      value: `Limited edition of ${art.editionSize}`,
    },
  ].filter(Boolean);

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
      <div className="bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" data-aos="fade-up">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
              <li>
                <Link
                  to="/"
                  className="hover:text-stone-900 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-stone-900 transition-colors duration-300"
                >
                  Shop
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-stone-800 font-medium">
                {art.title}
              </li>
            </ol>
          </nav>
          {/* Single column on mobile, two columns on lg+ */}
          <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT – gallery */}
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`Open full-size view of ${art.title}`}
                className="group relative block w-full rounded-2xl bg-white shadow-lg overflow-hidden p-4 sm:p-6"
              >
                <img
                  src={currentImage}
                  alt={altText}
                  className="w-full max-h-[70vh] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow text-xs font-medium text-stone-700">
                  🔍 Zoom
                </span>
              </button>

              {/* Thumbnail strip – only when there is more than one image */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show image ${index + 1} of ${images.length}`}
                      aria-current={index === activeImage}
                      className={`w-20 h-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors duration-300 ${
                        index === activeImage
                          ? "border-midnight"
                          : "border-transparent hover:border-stone-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT – sticky buy column on desktop */}
            <div className="lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
                {art.category || "Fine Art Print"}
              </p>

              <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-stone-800 mt-2">
                {art.title}
              </h1>

              {/* Artist */}
              <div className="flex items-center gap-2 mt-4">
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
              <p className="text-gray-600 leading-relaxed mt-4 text-sm">
                {art.description}
              </p>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-light text-stone-800">
                  ₦{art.price.toLocaleString()}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ₦{(art.price * 1.2).toLocaleString()}
                </span>
              </div>

              {/* Specs – rows only appear when the field exists */}
              {specs.length > 0 && (
                <dl className="mt-6 border-t border-stone-200 divide-y divide-stone-200">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start justify-between gap-4 py-3 text-sm"
                    >
                      <dt className="text-stone-500">{spec.label}</dt>
                      <dd className="text-stone-800 text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Size selection – 2 columns on tiny screens, 3 on sm+ */}
              {art.sizes?.length > 0 ? (
                <div className="mt-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    📐 Select Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {art.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={selectedSize === size}
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
              ) : (
                <p className="mt-6 text-xs text-stone-400">
                  Single edition size — no size options for this piece.
                </p>
              )}

              {/* Frame selection */}
              {art.frames?.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    🖼️ Frame Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {art.frames.map((frame) => (
                      <button
                        key={frame}
                        type="button"
                        onClick={() => setSelectedFrame(frame)}
                        aria-pressed={selectedFrame === frame}
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
              )}

              {/* Medium selection */}
              {art.mediums?.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    🖌️ Medium
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {art.mediums.map((medium) => (
                      <button
                        key={medium}
                        type="button"
                        onClick={() => setSelectedMedium(medium)}
                        aria-pressed={selectedMedium === medium}
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
              )}
              {/* Primary + secondary CTAs */}
              <div className="mt-8 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-midnight text-white px-4 py-3.5 rounded-xl font-semibold text-sm hover:bg-stone-800 transition-colors duration-300"
                >
                  🛒 Add to Cart
                </button>
                <Link
                  to="/contact"
                  className="w-full text-center border border-stone-300 hover:bg-stone-100 text-stone-700 px-4 py-3.5 rounded-xl font-medium text-sm transition-colors duration-300"
                >
                  Contact about this piece
                </Link>
              </div>

              {/* Trust signals */}
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {trustSignals.map((signal) => (
                  <li
                    key={signal.label}
                    className="flex items-center gap-2 text-xs text-stone-600"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 shrink-0 text-stone-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={signal.path} />
                      {signal.extra}
                    </svg>
                    <span>{signal.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Below the fold – related works */}
          {related.length > 0 && (
            <section
              aria-labelledby="related-heading"
              className="mt-16 sm:mt-24 border-t border-stone-200 pt-10 sm:pt-14"
              data-aos="fade-up"
            >
              <h2
                id="related-heading"
                className="text-2xl sm:text-3xl font-light tracking-wide text-stone-800 text-center"
              >
                You may also like
              </h2>
              <div className="mt-3 mx-auto w-24 h-0.5 bg-amber-600/60" />
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {related.map((item) => (
                  <ArtworkCard key={item.id} art={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${art.title} full-size view`}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
        >
          <button
            type="button"
            autoFocus
            onClick={() => setLightboxOpen(false)}
            aria-label="Close full-size view"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white text-xl leading-none hover:bg-white/20 transition-colors duration-300 flex items-center justify-center"
          >
            ✕
          </button>
          <img
            src={currentImage}
            alt={altText}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain"
          />
        </div>
      )}

      {/* Cart Add Confirmation Modal */}
      {showModal && addedItem && (
        <div
          data-aos="fade-down"
          data-aos-delay="200"
          role="dialog"
          aria-modal="true"
          aria-label="Added to cart"
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
              aria-label="Close"
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