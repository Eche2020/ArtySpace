import React from "react";
import { Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Shop from "./pages/Shop";
import ArtworkDetails from "./pages/ArtworkDetails";
import Cart from "./pages/Cart";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route index element={<Home />} />

          {/* Other Pages */}
          <Route path="shop" element={<Shop />} />
          <Route path="art/:id" element={<ArtworkDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="aboutme" element={<AboutMe />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
