import React from "react";
import { createContext, useContext, useState } from "react";

// create the context
const CartContext = createContext();

// provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // add artwork to cart — merges with an existing identical item
  // (same id + same size/frame/medium) by bumping quantity instead
  // of creating a duplicate row
  const addToCart = (artwork) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === artwork.id &&
          item.selectedSize === artwork.selectedSize &&
          item.selectedFrame === artwork.selectedFrame &&
          item.selectedMedium === artwork.selectedMedium,
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        return updated;
      }

      return [...prevCart, { ...artwork, quantity: 1 }];
    });
  };

  // remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // update quantity for an item already in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hook
export function useCart() {
  return useContext(CartContext);
}
