import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let {
    getLoggedUserCart,
    removeItem,
    updateProductCount,
    clearUserCart,
    numOfCartItems,
    setnumOfCartItems,
  } = useContext(cartContext);

  // null is better for initializing than [] => because it made errors when clearing the cart
  const [cartDetails, setcartDetails] = useState(null);
  const [isloading, setisloading] = useState(false);

  async function getCart() {
    setisloading(true);
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setcartDetails(response.data.data);
      setisloading(false);
      console.log("UserCart", response);
    } else if (response.response.data.statusMsg === "fail") {
      setcartDetails(null);
      setisloading(false);
      toast.error("No cart for this user");
      console.log(response);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  // bridge for removeItem so i can console the result and toast a notification

  async function deleteItem(productId) {
    let response = await removeItem(productId);
    setcartDetails(response.data.data);
    toast.success("product successfuly removed");
    console.log(response);
  }

  // bridge for Updating product count

  async function updateProductQuantity(count, productId) {
    let response = await updateProductCount(count, productId);
    setcartDetails(response?.data?.data);
    toast.success("Product Count Updated");
    console.log(response);
  }

  // bridge for Clearing cart

  async function deleteCart() {
    let response = await clearUserCart();
    setcartDetails(null);
    toast.success("Cart is Cleared");
    console.log(response);
    console.log(cartDetails);
  }

  // decrease the counter
  async function decreaseCounter(product) {
    console.log(product.count);
    if (product.count === 1) {
      console.log("equal 1");
      await updateProductQuantity(0, product.product._id);
      await deleteItem(product.product._id);
    } else {
      console.log("not equal 1");
      setnumOfCartItems(numOfCartItems - 1);
      updateProductQuantity(product.count - 1, product.product._id);
    }
  }

  return (
    <>
      <Helmet>
        <title>Cart Details</title>
      </Helmet>
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
        <>
          <div className="bg-main-light p-4 my-4 shadow-lg rounded-3">
            <h3>Shop Cart :</h3>

            <h6 className="text-main">
              Total Cart Price : {cartDetails?.totalCartPrice} EGP
            </h6>

            {cartDetails?.products?.map((product) => (
              <div
                key={product._id}
                className="row align-self-center border-bottom py-2"
              >
                <div className="col-md-1">
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt="cart item"
                  />
                </div>
                <div className="col-md-11 hstack justify-content-between">
                  <div>
                    <h6>{product.product.title}</h6>
                    <h6 className="text-main">Price : {product.price}</h6>
                    {/* notice where the id place in the responce because it gave me an error before */}
                    <button
                      onClick={() => deleteItem(product.product._id)}
                      className="btn m-0 p-0"
                    >
                      <i className="fa-regular fa-trash-can text-main me-2 "></i>
                      Remove
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={() => decreaseCounter(product)}
                      className="btn border-main px-2 py-0 btn-sm"
                    >
                      -
                    </button>
                    <span className={style.count}> {product.count}</span>
                    <button
                      onClick={() => {
                        updateProductQuantity(
                          product.count + 1,
                          product.product._id
                        );
                        setnumOfCartItems(numOfCartItems + 1);
                      }}
                      className="btn border-main px-2 py-0 btn-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-center btn text-main">
              <button
                onClick={deleteCart}
                className="btn bg-main text-white mt-3"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="mt-5">
            <button className="btn bg-main w-100" disabled={!cartDetails}>
              <Link
                className="text-white text-decoration-none d-block"
                to={"/checkout"}
              >
                Checkout
              </Link>
            </button>
          </div>
        </>
      )}
    </>
  );
}
