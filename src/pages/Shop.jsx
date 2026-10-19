import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { artworks } from "../data/artworks";
import ArtworkCard from "./ArtworkCard";

// Cards rendered per "page" for the Load more button (never infinite scroll)
const PAGE_SIZE = 8;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
];

function Shop() {
  useEffect(() => {
    // Re-initialize and refresh AOS every time this component mounts
    AOS.init({
      duration: 800,
      once: true, // Only animate once (prevents re-hiding on scroll)
      offset: 50, // Trigger slightly earlier
      disable: false,
    });

    // CRITICAL: Refresh calculations after React paints the DOM
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Optional: clean up AOS classes to prevent ghost states
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.classList.remove("aos-animate");
      });
    };
  }, []);

  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter options come from the data itself, never hard-coded
  const categories = useMemo(
    () => [
      "All",
      ...new Set(artworks.map((art) => art.category).filter(Boolean)),
    ],
    [],
  );

  const priceSteps = useMemo(
    () => [...new Set(artworks.map((art) => art.price))].sort((a, b) => a - b),
    [],
  );

  const filtered = useMemo(() => {
    const list = artworks.filter(
      (art) =>
        (category === "All" || art.category === category) &&
        (maxPrice === "All" || art.price <= Number(maxPrice)),
    );

    switch (sortBy) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      default:
        // "Newest" – the data has no dates, so fall back to year then newest id
        return [...list].sort(
          (a, b) => (b.year ?? 0) - (a.year ?? 0) || b.id - a.id,
        );
    }
  }, [category, maxPrice, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;
  const isFiltered = category !== "All" || maxPrice !== "All";

  // Re-measure AOS whenever the number of rendered cards changes
  useEffect(() => {
    AOS.refresh();
  }, [visibleCount, filtered.length]);

  // Changing any filter/sort restarts paging. Done in the handlers (not in an
  // effect) so we never call setState synchronously inside useEffect.
  const handleCategoryChange = (option) => {
    setCategory(option);
    setVisibleCount(PAGE_SIZE);
  };

  const handlePriceChange = (value) => {
    setMaxPrice(value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setVisibleCount(PAGE_SIZE);
  };

  const clearFilters = () => {
    setCategory("All");
    setMaxPrice("All");
    setSortBy("newest");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* In-page back link – subtle, must not compete with Add to Cart */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/"
            aria-label="Back to home page"
            className="inline-flex items-center gap-2 text-sm text-stone-500 border border-stone-200 rounded-full px-4 py-1.5 hover:text-stone-900 hover:border-stone-400 hover:bg-white transition-colors duration-300"
          >
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>

        {/* Hero / intro strip with decorative line */}
        <div className="text-center mb-10 sm:mb-14">
          <h1
            data-aos="fade-up"
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-stone-800"
          >
            Discover Art
          </h1>
          <div
            data-aos="fade-up"
            className="mt-4 sm:mt-6 mx-auto w-24 h-0.5 bg-amber-600/60"
          />
          <p
            data-aos="fade-up"
            className="mt-3 sm:mt-4 text-stone-500 text-base sm:text-lg max-w-xl mx-auto px-2"
          >
            Original works curated for collectors and enthusiasts
          </p>
        </div>

        {/* Filter + sort bar */}
        <section aria-label="Filter and sort" className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              aria-live="polite"
              className="text-sm text-stone-500"
              data-aos="fade-up"
            >
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              {isFiltered ? " match your filters" : ""}
            </p>

            {/* Mobile-only toggle – the panel below is always visible on lg+ */}
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="shop-filters"
              className="lg:hidden inline-flex items-center gap-2 text-sm text-stone-700 border border-stone-300 rounded-full px-4 py-1.5 hover:bg-white transition-colors duration-300"
            >
              {filtersOpen ? "Hide filters" : "Filters"}
              {isFiltered && (
                <span aria-hidden="true" className="text-amber-700">
                  •
                </span>
              )}
            </button>
          </div>

          <div
            id="shop-filters"
            className={`${
              filtersOpen ? "grid" : "hidden"
            } lg:grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 border border-stone-200 bg-white rounded-2xl p-4 sm:p-5`}
          >
            {/* Category */}
            <div>
              <span className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                Category
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleCategoryChange(option)}
                    aria-pressed={category === option}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors duration-300 ${
                      category === option
                        ? "border-midnight bg-midnight text-white"
                        : "border-stone-300 text-stone-700 hover:border-midnight hover:bg-stone-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price-filter"
                className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2"
              >
                Price
              </label>
              <select
                id="price-filter"
                value={maxPrice}
                onChange={(event) => handlePriceChange(event.target.value)}
                className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-800 bg-white focus:outline-none focus:ring-1 focus:ring-midnight"
              >
                <option value="All">Any price</option>
                {priceSteps.map((price) => (
                  <option key={price} value={price}>
                    Up to ₦{price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label
                htmlFor="sort-order"
                className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2"
              >
                Sort
              </label>
              <select
                id="sort-order"
                value={sortBy}
                onChange={(event) => handleSortChange(event.target.value)}
                className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-800 bg-white focus:outline-none focus:ring-1 focus:ring-midnight"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
        {/* Grid – 2 cols mobile, 3 tablet, 4 desktop – or a friendly empty state */}
        {filtered.length === 0 ? (
          <div
            data-aos="fade-up"
            className="text-center bg-white border border-stone-200 rounded-2xl py-16 sm:py-24 px-4"
          >
            <span className="text-5xl" aria-hidden="true">
              🖼️
            </span>
            <h2 className="text-2xl font-light tracking-wide text-stone-800 mt-4">
              Nothing matches those filters
            </h2>
            <p className="text-stone-500 mt-2">
              Try a different category or widen the price range.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              data-aos="fade-up"
            >
              {visible.map((art) => (
                <ArtworkCard key={art.id} art={art} />
              ))}
            </div>

            {/* Explicit pagination – always available, never infinite-only */}
            {remaining > 0 && (
              <div className="mt-10 sm:mt-14 text-center" data-aos="fade-up">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 border border-stone-300 hover:bg-white text-stone-700 px-8 py-3 rounded-xl font-medium transition-colors duration-300"
                >
                  Load more
                  <span className="text-stone-500 text-sm">
                    ({remaining} remaining)
                  </span>
                </button>
              </div>
            )}

            {remaining === 0 && filtered.length > PAGE_SIZE && (
              <p className="mt-10 text-center text-sm text-stone-500">
                You've reached the end — all {filtered.length} pieces shown.
              </p>
            )}
          </>
        )}
        {/* Secondary catch-all CTA for users who scrolled the whole grid */}
        <div className="mt-14 sm:mt-20 text-center" data-aos="fade-up">
          <p className="text-stone-500 mb-5">Looking for something else?</p>
          <Link
            to="/"
            aria-label="Back to home page"
            className="inline-flex items-center gap-2 border border-stone-300 hover:bg-white text-stone-700 px-8 py-3 rounded-xl font-medium transition-colors duration-300"
          >
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shop;