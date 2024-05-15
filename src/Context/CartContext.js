import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Components/baseUrl";

export const cartContext = createContext();

export function CartContextProvider(props) {
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);

  const header = {
    token: localStorage.getItem("userToken"),
  };

  async function getCart() {
    header.token = localStorage.getItem("userToken");
    const response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems);
      setcartId(response.data.data._id);
      console.log(response.data.numOfCartItems, response.data.data._id);
    }
  }

  // This code to update the info with each refresh
  // solution to solve the problem of null cartId
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      getCart();
    }
  }, [localStorage.getItem("userToken")]);

  async function addToCart(productId) {
    return axios
      .post(
        `${baseUrl}api/v1/cart`,
        { productId }, // this equal to {productId: productId}
        { headers: header } // or {headers} if the variable name was the same (headers)
      )
      .then((response) => response) // this means if success return the response
      .catch((error) => error); // this means if fail return the error
  }

  async function getLoggedUserCart() {
    // console.log(header.token);
    return axios
      .get(`${baseUrl}api/v1/cart`, {
        headers: header,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async function removeItem(productId) {
    return axios
      .delete(`${baseUrl}api/v1/cart/${productId}`, {
        headers: header,
      })
      .then((response) => {
        setnumOfCartItems(numOfCartItems-1)
        return response
      })
      .catch((error) => error);
  }

  async function updateProductCount(count, productId) {
    return axios
      .put(
        `${baseUrl}api/v1/cart/${productId}`,
        { count },
        { headers: header }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function clearUserCart() {
    return axios
      .delete(`${baseUrl}api/v1/cart`, {
        headers: header,
      })
      .then((response) => {
        setnumOfCartItems(0)
        return response
      })
      .catch((error) => error);
  }

  async function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `${baseUrl}api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress: shippingAddress },
        {
          headers: header,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        cartId,
        numOfCartItems,
        setnumOfCartItems,
        getCart,
        addToCart,
        getLoggedUserCart,
        removeItem,
        updateProductCount,
        clearUserCart,
        onlinePayment,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
