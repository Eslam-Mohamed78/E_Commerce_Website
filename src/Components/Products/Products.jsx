import style from "./Products.module.css";
import { React, useContext, useEffect, useState } from "react";
import { dataContext } from "../../Context/DataContext";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Products() {
  const [products, setproducts] = useState([]);
  const [isloading, setisloading] = useState(false);

  // =============== getting products =================
  const { getData } = useContext(dataContext);

  async function getProducts() {
    setisloading(true);
    const response = await getData("products");
    if (response?.response?.data?.statusMsg === "fail") {
      // failed
      setisloading(true);
      toast.error("There are no products");
      console.log(response);
    } else {
      // succeed => data is fetched
      setisloading(false);
      setproducts(response.data.data.slice(11,22));
      // console.log(response.data.data);
    }
  }

  useEffect(() => {
    getProducts();
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

  return (
    <>
      <Helmet>
        <title>Products</title>
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
          {products.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3 cursor-pointer">
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
