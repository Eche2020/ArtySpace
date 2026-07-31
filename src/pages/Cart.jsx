import React, { useEffect } from "react";
import AOS from "aos";

import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; //
import { getCartOrderLink } from "../utils/whatsapp";
import { getCartOrderEmailLink } from "../utils/email";

export default function Cart() {
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

  const { cart, removeFromCart, updateQuantity, clearCart } = useCart(); // assume updateQuantity exists

  // Compute totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const shipping = subtotal > 200 ? 0 : 15; // free shipping over $200
  const total = subtotal + shipping;

  const handleOrderViaWhatsApp = () => {
    window.open(getCartOrderLink(cart, total), "_blank");
    clearCart();
  };

  const handleOrderViaEmail = () => {
    window.location.href = getCartOrderEmailLink(cart, total);
    clearCart();
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div data-aos="fade-down" data-aos-delay="200" className="text-center">
          <span className="text-6xl">🛒</span>
          <h1 className="text-3xl font-light text-stone-800 mt-4">
            Your cart is empty
          </h1>
          <p className="text-stone-500 mt-2 mb-8">
            Looks like you haven't added any artwork yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-medium transition"
          >
            Browse Artworks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        data-aos="fade-down"
        data-aos-delay="200"
        className="max-w-6xl mx-auto"
      >
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-8 sm:mb-12">
          Shopping Cart
          <span className="text-xl sm:text-2xl text-stone-400 ml-3">
            ({cart.length} {cart.length === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white  shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                {/* Product Image – square, responsive, never larger than 10rem */}
                <div className="w-full max-w-[10rem] sm:w-40 h-auto aspect-square  overflow-hidden bg-stone-100 shrink-0 mx-auto sm:mx-0">
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-stone-800">
                        {item.title}
                      </h3>
                      <button
                        data-aos="fade-in"
                        data-aos-delay="200"
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors text-xl leading-none cursor-pointer shrink-0"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-sm text-stone-500 mt-1">
                      {item.Artist || "Artist Name"}
                    </p>

                    {/* Options selected */}
                    {(item.selectedSize ||
                      item.selectedFrame ||
                      item.selectedMedium) && (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        {item.selectedSize && (
                          <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedFrame && (
                          <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                            Frame: {item.selectedFrame}
                          </span>
                        )}
                        {item.selectedMedium && (
                          <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                            Medium: {item.selectedMedium}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price & Quantity */}
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-stone-200 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, (item.quantity || 1) - 1),
                          )
                        }
                        className="px-3 py-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
                      >
                        −
                      </button>
                      <span className="px-3 sm:px-4 py-1 text-sm font-medium text-stone-800 border-x border-stone-200">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) + 1)
                        }
                        className="px-3 py-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl sm:text-2xl font-light text-stone-800">
                        ₦{(item.price * (item.quantity || 1)).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-stone-400">
                          ₦{item.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar – already responsive */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-stone-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-medium">Free</span>
                    ) : (
                      `₦${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-4 flex justify-between text-base font-semibold text-stone-800">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleOrderViaWhatsApp}
                className="w-full mt-6 bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-medium transition-colors duration-300"
              >
                Proceed to Order via WhatsApp
              </button>

              <button
                onClick={handleOrderViaEmail}
                className="w-full mt-3 border border-stone-300 hover:bg-stone-100 text-stone-700 py-3 rounded-xl font-medium transition-colors duration-300"
              >
                Order via Email instead
              </button>

              <Link
                to="/shop"
                className="block text-center mt-4 text-sm text-stone-500 hover:text-stone-800 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
