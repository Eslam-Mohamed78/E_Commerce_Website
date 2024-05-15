import React, { useContext } from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
// import logo from "./../../Assets/Images/freshcart-logo.svg";
import logo from "./../../Assets/Logo.png";
import { cartContext } from "../../Context/CartContext";
import { dataContext } from "../../Context/DataContext";

export default function Navbar({ userData, logout }) {
  const { numOfCartItems } = useContext(cartContext);
  const { numOfWishListItems } = useContext(dataContext);

  const logoStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '5px',
    // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const light={
    backgroundColor:'#fff',
    color:"white"

  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-important" style={light}>
        <div className="container">
          <Link className="navbar-brand d-sm-none d-md-block" to="">
            <img src={logo} style={logoStyle} alt="logo" />
          </Link>
          <button
            className="navbar-toggler d-xl-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
           
              <ul className="navbar-nav m-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active navbarLink fw-bold"
                    to=""
                    aria-current="page"
                  >
                    Home <span className="visually-hidden">(current)</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link navbarLink fw-bold" to="Products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navbarLink fw-bold" to="Categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navbarLink fw-bold" to="Brands">
                    Brands
                  </Link>
                </li>
              </ul>
            

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">
             
              {userData ? (
                <>
                 
                  <li className="nav-item position-relative me-lg-3 d-sm-non">
                    <Link className="nav-link" to="wishlist">
                      <i className="fa-solid text-main fa-heart-circle-plus fs-5"></i>
                      <span className="badge position-absolute cartCounter">
                        {numOfWishListItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item position-relative">
                    <Link className="nav-link" to="cart">
                      <i className="fas text-main fa-shopping-cart fa-lg"></i>
                      <span className="badge position-absolute cartCounter">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ms-2">
                    <span
                      onClick={logout}
                      className="nav-link cursor-pointer navbarLink fw-bold"
                    >
                      LogOut
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link navbarLink fw-bold" to="Login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link navbarLink fw-bold" to="Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
