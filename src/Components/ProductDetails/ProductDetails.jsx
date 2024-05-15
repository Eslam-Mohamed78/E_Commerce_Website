import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import Slider from "react-slick";
import { toast } from "react-hot-toast";
import { baseUrl } from "../baseUrl";

export default function ProductDetails() {
  const [productDetails, setproductDetails] = useState(null);
  const [isloading, setisloading] = useState(false);

  let params = useParams();

  async function getProductDetails(id) {
    setisloading(true);
    let { data } = await axios.get(
      `${baseUrl}api/v1/products/${id}`
    );
    setproductDetails(data.data);
    setisloading(false);
  }

  useEffect(() => {
    getProductDetails(params.id);
  }, []);

    // ==================== AddToCart ===================
    let { addToCart, setnumOfCartItems } = useContext(cartContext);

    async function addProduct(id) {
      let response = await addToCart(id); // response can be the success or fail object
      if (response?.data?.status === "success") {
        setnumOfCartItems(response.data.numOfCartItems);
        toast.success(response.data.message, { duration: 2000 });
      } else {
        toast.error(response.response.data.message);
      }
      console.log(response);
    }
  

  // Slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {isloading ? (
        <div className="d-flex justify-content-center">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="row align-items-center py-3 gap-3">
          <div className="col-md-4 ">
            <Slider {...settings}>
              {productDetails?.images.map((img) => (
                <img key={productDetails._id} src={img} alt="product"></img>
              ))}
            </Slider>
          </div>

          <div className=" col-md-6">
            <h3>{productDetails?.title}</h3>
            <p className="text-muted p-2">{productDetails?.description}</p>
            <div className="d-flex justify-content-between">
              <span className="text-muted">{productDetails?.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color"></i>
                {productDetails?.ratingsAverage}
              </span>
            </div>
            <button
                  onClick={() => addProduct(productDetails._id)}

             className="btn bg-main text-white w-100 mt-4">+ Add</button>
          </div>
        </div>
      )}
    </>
  );
}
