import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Footer from "./components/footer";
import Hero from "./components/Hero";


// import ArtworkDetails from "./pages/ArtworkDetails";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Confirmation from "./pages/Confirmation";
// import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/art/:id" element={<ArtworkDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
