import React from "react";
import style from "./NotFound.module.css";
import image from "./../../Assets/Images/Image-article-05-08.jpg";

export default function NotFound() {
  return (
    <>
      <div className={style.notFound}>
        <img className="h-100 w-100" src={image} alt="NotFound" />
      </div>
    </>
  );
}
