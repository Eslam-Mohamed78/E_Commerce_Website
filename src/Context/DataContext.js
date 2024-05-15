import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Components/baseUrl";


export const dataContext = createContext();

export function DataContextProvider(props) {
  const [numOfWishListItems, setnumOfWishListItems] = useState(0);

  async function getData(endPoint) {
    return axios
      .get(`${baseUrl}api/v1/${endPoint}`)
      .then((response) => response)
      .catch((error) => error);
  }

  // WishList
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getWishList(endPoint) {
    return axios
      .get(`${baseUrl}api/v1/${endPoint}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data.data.length);
        setnumOfWishListItems(response.data.data.length);
        return response;
      })
      .catch((error) => error);
  }

  async function removeWishListProduct(endPoint) {
    return axios
      .delete(`${baseUrl}api/v1/${endPoint}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async function addToWishList(productId) {
    return axios
      .post(
        `${baseUrl}api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  // This code to update the info with each refresh
  // solution to solve the problem of null cartId
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      getWishList(`wishlist`);
    }
  }, [localStorage.getItem("userToken")]);

  return (
    <dataContext.Provider
      value={{
        numOfWishListItems,
        setnumOfWishListItems,
        getData,
        getWishList,
        removeWishListProduct,
        addToWishList,
      }}
    >
      {props.children}
    </dataContext.Provider>
  );
}
