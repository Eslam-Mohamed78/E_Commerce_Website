import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({ userData, setUserData }) {
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <Navbar userData={userData} logout={logout}></Navbar>
      <div className="background">
        <div className="container py-5">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
