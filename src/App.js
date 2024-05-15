import "./App.css";
import {
  Navigate,
  RouterProvider,
  // createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Categories from "./Components/Categories/Categories";
import SpecificCategory from "./Components/SpecificCategory/SpecificCategory";
import Brands from "./Components/Brands/Brands";
import SpecificBrand from "./Components/SpecificBrand/SpecificBrand";
import WishList from "./Components/WishList/WishList";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import NotFound from "./Components/NotFound/NotFound";
import { Offline } from "react-detect-offline";
import { DataContextProvider } from "./Context/DataContext";

function App() {
  // Prevent logout after refresh
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  // Token Info
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  // to prevent routing without login /
  // first letter should be capital because this fucntion will be Component.
  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to={"/login"} />;
    } else {
      return props.children;
    }
  }

  const routers = createHashRouter([
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            
              <Home />
          
          ),
        },
        {
          path: "cart",
          element: (
            
              <Cart />
          
          ),
        },
        {
          path: "Checkout",
          element: (
            
              <Checkout />
          
          ),
        },
        {
          path: "products",
          element: (
            
              <Products />
          
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            
              <ProductDetails />
          
          ),
        },
        {
          path: "categories",
          element: (
            
              <Categories />
          
          ),
        },
        {
          path: "SpecificCategory/:category",
          element: (
            
              <SpecificCategory />
          
          ),
        },
        {
          path: "Brands",
          element: (
            
              <Brands />
          
          ),
        },
        {
          path: "SpecificBrand/:brand",
          element: (
            
              <SpecificBrand />
          
          ),
        },
        {
          path: "WishList",
          element: (
            
              <WishList />
          
          ),
        },
        { path: "Login", element: <Login saveUserData={saveUserData} /> },
        { path: "Register", element: <Register /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <DataContextProvider>
      <CartContextProvider>
        <Toaster />
        <Offline>
          <div className="offline text-danger rounded-2">
            We are Offline Now ! <i className="text-main fa-solid fa-wifi"></i>
          </div>
        </Offline>
        <RouterProvider router={routers}></RouterProvider>
      </CartContextProvider>
    </DataContextProvider>
  );
}

export default App;
