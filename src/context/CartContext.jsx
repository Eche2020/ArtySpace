import React from "react";
import { createContext, useContext, useState } from "react";

// create the context
const CartContext = createContext();

// provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // add artwork to cart
  const addToCart = (artwork) => {
    setCart((prevCart) => [...prevCart, artwork]);
  };

  // remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
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
