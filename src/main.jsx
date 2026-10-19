import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Resets scroll position to the top on every route change */}
    <ScrollToTop />
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>,
);
