import React from "react";
import style from "./MainSlider.module.css";
import banner1 from "../../Assets/Images/grocery-banner.png";
import banner2 from "../../Assets/Images/grocery-banner-2.jpeg";
import banner3 from "../../Assets/Images/blog-img-1.jpeg";
import banner4 from "../../Assets/Images/slider-image-2.jpeg";
import banner5 from "../../Assets/Images/slider-image-3.jpeg";
import banner6 from "../../Assets/Images/slider-2.jpeg";
import banner7 from "./../../Assets/Images/695.jpg";
import banner8 from "./../../Assets/Images/blog-img-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  // Slick slider


  return (
    <>
    <div className={'pb-2'}>
          <img className="w-100" height={350} src={banner1} alt="banner" />
        </div>
     
    </>
  );
}
