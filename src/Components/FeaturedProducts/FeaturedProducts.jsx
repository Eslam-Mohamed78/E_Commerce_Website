// import style from "./FeaturedProducts.module.css";
import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { dataContext } from "../../Context/DataContext";
import { toast } from "react-hot-toast";
import { baseUrl } from "../baseUrl";

export default function FeaturedProducts() {
  const [products, setproducts] = useState([]);
  const [isloading, setisloading] = useState(false);

  // =============== getting products =================

  async function getProducts() {
    setisloading(true);
    let { data } = await axios.get(
      `${baseUrl}api/v1/products`
    );
    setproducts(data.data.slice(11));
  
    setisloading(false);

    // console.log(products); // will give empty array and i don't need to call it here
  }

  useEffect(() => {
    // update number wish list items

    getProducts();
  }, []);

  // ==================== AddToCart ===================
  const { addToCart, setnumOfCartItems } = useContext(cartContext);

  async function addProduct(id) {
    const response = await addToCart(id); // response can be the success or fail object
    if (response?.data?.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems);
      toast.success(response.data.message, { duration: 2000 });
    } else {
      toast.error(response.response.data.message);
    }
    console.log(response);
  }

  // ==================== AddToWishList ===================
  const { addToWishList, numOfWishListItems, setnumOfWishListItems } = useContext(dataContext);

  async function addProductToWishList(event, id) {
    event.preventDefault()
    const response = await addToWishList(id); // response can be the success or fail object
    if (response?.data?.status === "success") {
      setnumOfWishListItems(numOfWishListItems+1)
      toast.success(response.data.message, { duration: 2000 });
    } else {
      toast.error(response.response.data.message);
    }
    console.log(response);
  }
  

  return (
    <>
      {isloading ? (
        <div className="d-flex justify-content-center fixed-top pt-5">
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
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3 cursor-pointer">
              <div className="product px-2 py-3 position-relative">
                <Link
                  to={`ProductDetails/${product._id}`}
                  className=" text-reset text-decoration-none"
                >
                  <i
                  onClick={(event)=> addProductToWishList(event, product?._id)}
                  className="fa-solid fa-heart-circle-plus wishIcon"></i>

                  <img
                    className="w-100"
                    src={product.imageCover}
                    alt="product"
                  />
                  <div className="p-3">
                    <span className="text-main fw-bolder font-sm">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>
                {/* if the button was inside the link it will do its task but will lead you to the Link page */}
                <button
                  onClick={() => addProduct(product._id)}
                  className="btn text-white w-100"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
