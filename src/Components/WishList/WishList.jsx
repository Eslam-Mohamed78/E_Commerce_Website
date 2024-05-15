import style from "./WishList.module.css";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext";
import { toast } from "react-hot-toast";

export default function WishList() {
  const [isloading, setisloading] = useState(false);
  const [wishList, setwishList] = useState(null);

  const { getWishList, removeWishListProduct, setnumOfWishListItems } = useContext(dataContext);

  async function wishListData() {
    setisloading(true);
    const response = await getWishList("wishlist");
    if (response?.response?.data?.statusMsg === "fail") {
      // failed
      setisloading(true);
      toast.error("There are no brands");
      console.log(response);
    } else {
      // succeed => data is fetched
      setisloading(false);
      setwishList(response.data.data);
      console.log(response.data.data);
    }
  }

  useEffect(() => {
    wishListData();
  }, []);

  // Remove Product
  async function deleteProduct(productId) {
    let response = await removeWishListProduct(`wishlist/${productId}`);
    wishListData();
    toast.success("product successfuly removed");
    console.log(response.data.data);
  }

  // Clear Wish List
  async function clearAllProducts() {
    for(let i=0; i<wishList?.length; i++) {
      console.log('entered')
      removeWishListProduct(`wishlist/${wishList[i]?.id}`)
    }
    setwishList(null)
    setnumOfWishListItems(0)
  }

  return (
    <>
      <Helmet>
        <title>Wish_List</title>
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
          <div className="bg-main-light p-4 my-4 w-75 mx-auto shadow-lg rounded-3">
            <h3 className="text-main fw-bold text-center">Your Wish List</h3>

            {wishList?.map((product) => (
              <div
                key={product?.id}
                className="row align-self-center border-bottom py-2"
              >
                <div className="col-md-1">
                  <img
                    src={product?.imageCover}
                    className="w-100"
                    alt="cart item"
                  />
                </div>
                <div className="col-md-11 hstack justify-content-between">
                  <div>
                    <h6>{product?.title}</h6>
                    <h6 className="text-main">Price : {product.price}</h6>
                    {/* notice where the id place in the responce because it gave me an error before */}
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btn m-0 p-0"
                    >
                      <i className="fa-regular fa-trash-can text-main me-2 "></i>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-center text-main">
              <button
                onClick={clearAllProducts}
                className="btn bg-main text-white mt-3"
              >
                Clear Wish List
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
