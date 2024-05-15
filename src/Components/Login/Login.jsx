import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { baseUrl } from "../baseUrl";

export default function Login({ saveUserData }) {
  const [isloading, setisloading] = useState(false);
  const [MessageError, setMessageError] = useState("");
  let navigate = useNavigate();

  // Yup Validation
  const yupValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("InValid Email Address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase..."
      ),
  });

  // Authentication using formik
  async function handleLogin(values) {
    setisloading(true);

    let { data } = await axios
      .post(`${baseUrl}api/v1/auth/signin`, values)
      .catch((err) => {
        setisloading(false);
        setMessageError(err.response.data.message);
        console.log(err.response.data.message);
      });
    console.log(data);

    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      await saveUserData();
      setisloading(false);
      navigate("/");
      console.log("loged in");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: yupValidation,
  });

  return (
    <>
      <Helmet>
        <title>Login_Page</title>
      </Helmet>
      <div className="bg-main-light p-4 my-4 w-75 mx-auto shadow-lg rounded-3">
        <h2 className="my-4">Login Now :</h2>

        {MessageError ? (
          <div className="alert alert-danger">{MessageError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="form-control mt-1 mb-4"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="form-control mt-1 mb-2"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
          <div className="mb-4">
            <Link
              className=" text-reset text-decoration-none"
              to="/ForgetPassword"
            >
              ForgetPassword..? <i className="fa-solid text-main fa-unlock-keyhole"></i>
            </Link>
          </div>

          {isloading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin text-white"></i>
            </button>
          ) : (
            <button
              type="submit"
              className=" btn bg-main text-white"
              disabled={!(formik.dirty && formik.isValid)}
            >
              LogIn
            </button>
          )}
        </form>
      </div>
    </>
  );
}
