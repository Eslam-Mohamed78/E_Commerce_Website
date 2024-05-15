import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { baseUrl } from "../baseUrl";


export default function CategorySlider() {
  const [Categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      `${baseUrl}api/v1/categories`
    );
    setCategories(data.data.slice(3));
  }

  useEffect(() => {
    getCategories();
  }, []);


  // Slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <h2 className="mb-3">Shop Popular Categories</h2>
      <Slider {...settings} className=" rounded-2 overflow-hidden text-center mb-4">
        {Categories.map((category) => (
          <div key={category._id} className=" cursor-pointer px-2">
            <img
              className="w-100"
              height={200}
              src={category.image}
              alt="product"
            ></img>
            <h2 className="h6 pt-3 fw- text-main">{category.name}</h2>
          </div>
        ))}
      </Slider>
    </>
  );
}
