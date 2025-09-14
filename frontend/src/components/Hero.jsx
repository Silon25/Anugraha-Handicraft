import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Hero = () => {
  // Define categories
  const categories = [
    { name: 'Men', image: assets.men_img },
    { name: 'Women', image: assets.women_img },
    { name: 'Kids', image: assets.kids_img },
  ];

  const { products } = useContext(ShopContext);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    // Group and sort products by category
    const groupedProducts = categories.reduce((acc, category) => {
      const filtered = products
        .filter((product) => product.category === category.name)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      acc[category.name] = filtered; // Store all products for this category
      return acc;
    }, {});

    setCategoryProducts(groupedProducts);
  }, [products, categories]);

  // Settings for react-slick
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/3 flex items-center justify-center py-10 sm:py-0 relative">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrival
          </h1>

          <div className="flex items-center gap-2">
            <Link to="/collection" className="font-semibold text-sm md:text-base">
              SHOP NOW
            </Link>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>

        {/* Down Pointer */}
        <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2">
          <a href="#next-section" className="flex flex-col items-center">
            <span className="animate-bounce text-[#414141] text-lg">&#x2193;</span>
            <p className="text-xs text-[#414141]">Explore</p>
          </a>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-2/3 flex justify-center items-center">
        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border rounded-md shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              {categoryProducts[category.name] && categoryProducts[category.name].length > 0 ? (
                <Slider {...sliderSettings} className="w-full">
                  {categoryProducts[category.name].map((product, i) => (
                    <div key={i}>
                      <ProductItem
                        id={product._id}
                        image={product.image}
                        // hidePrice={true}  // hide Nrs and price
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <p className="text-gray-500">Loading Products</p>
              )}

              <Link to={`/collection?category=${category.name}`}>
                <h3 className="mt-2 text-lg font-semibold
                 text-gray-800 hover:text-blue-500 hover:underline transition duration-300">
                  {category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
