import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Art1 from "../../assets/Art1.jpg";
import Art2 from "../../assets/Art2.jpg";
import Art3 from "../../assets/Art3.avif";
import Yoko1 from "../../assets/Yoko1.avif";
import Yoko2 from "../../assets/Yoko2.avif";
import Nature1 from "../../assets/nature01.jpg";
import Nature2 from "../../assets/nature2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImport from "react-slick";
const Slider = SliderImport.default || SliderImport;


export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const heroImages = [
    { id: 1, img: Nature1 },
    { id: 2, img: Nature2 },
    { id: 3, img: Art1 },
    { id: 4, img: Art2 },
    { id: 5, img: Art3 },
    { id: 6, img: Yoko1 },
    { id: 7, img: Yoko2 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-midnight relative overflow-hidden">
  <div className="container py-8 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
      
      {/* LEFT SECTION */}
      <div className="col-span-1 lg:col-span-1 flex flex-col items-center justify-center order-2 lg:order-1">
        {/* Small Images – responsive & proportional */}
        <div className="flex flex-col sm:flex-row gap-5 mb-6 w-full justify-center items-center pb-2">
          <img
            src={Art1}
            alt=""
            data-aos="fade-right"
            className="w-full max-w-90 h-auto aspect-360/224 object-cover shrink-0 "
          />
          <img
            src={Art2}
            alt=""
            data-aos="fade-left"
            data-aos-delay="200"
            className="w-full max-w-52 h-auto aspect-208/160 object-cover shrink-0"
          />
        </div>

        {/* Heading + CTA */}
        <div data-aos="fade-up" className="text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-tight drop-shadow-lg">
            RAZAK COLLECTIONS
          </h1>
          <p
            data-aos="zoom-in"
            data-aos-delay="300"
            className="text-white p-5 tracking-tight leading-tight drop-shadow-lg text-sm sm:text-base"
          >
            PHOTOGRAPHY GALLERY | NIGERIA
          </p>
          <Link
            to="/shop"
            data-aos="zoom-in"
            data-aos-delay="300"
            className="inline-block mt-4 lg:mt-8 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-linear-to-r from-midnight to-gray-600 text-white rounded-xl hover:shadow-md hover:from-midnight hover:to-gray-200 transform hover:scale-105 transition-all duration-300 text-center"
          >
            Explore Gallery
          </Link>
        </div>
      </div>

      {/* RIGHT HERO IMAGE – responsive height */}
      <div
        className="col-span-1 lg:col-span-2 relative ml-0 lg:ml-80 order-1 lg:order-2"
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        <Slider {...settings}>
          {heroImages.map((data) => (
            <div key={data.id}>
              <div
                className="w-full h-64 sm:h-80 md:h-96 lg:h-130 bg-cover bg-center shadow-2xl"
                style={{ backgroundImage: `url(${data.img})` }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </div>
</div>
  );
}