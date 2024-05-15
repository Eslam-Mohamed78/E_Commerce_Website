import style from "./SpecificCategory.module.css";
import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../../Context/DataContext";
import { cartContext } from "../../Context/CartContext";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function SpecificCategory() {
  const [isloading, setisloading] = useState(false);
  const [specificCategory, setspecificCategory] = useState(null);

  // =============== getting products =================
  const { getData } = useContext(dataContext);

  const { category } = useParams();
  console.log("category", category);

  async function getProducts() {
    setisloading(true);
    const response = await getData(`products?category=${category}`);
    console.log(response);
    if (response?.response?.data?.statusMsg === "fail") {
      // failed
      setisloading(true);
      toast.error("There are no categories");
      console.log(response);
    } else {
      // succeed => data is fetched
      setisloading(false);
      setspecificCategory(response.data.data)
    }
  }

  useEffect(() => {
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

  return (
    <>
      <Helmet>
        <title>Specific_Category</title>
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
        <div className="row">
          {specificCategory?.map((product) => (
            <div key={product._id} className="col-md-3 col-sm-6 cursor-pointer">
              <div className="product px-2 py-3">
                <Link
                  to={`/ProductDetails/${product._id}`}
                  className=" text-reset text-decoration-none"
                >
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
                  className="btn bg-main text-white w-100"
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
