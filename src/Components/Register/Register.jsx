import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import { baseUrl } from "../baseUrl";

export default function Register() {
  // Yup Validation
  const yupValidation = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name minLength is 3")
      .max(15, "Name maxLength is 15"),
    email: Yup.string()
      .required("Email is required")
      .email("InValid Email Address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase..."
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password & rePassword doesn't match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone must be Egyption number"),
  });

  const [isloading, setisloading] = useState(false);
  const [MessageError, setMessageError] = useState("");
  let navigate = useNavigate();

  // Authentication using formik
  async function handleRegister(values) {
    setisloading(true);

    let { data } = await axios
      .post(`${baseUrl}api/v1/auth/signup`, values)
      .catch((err) => {
        setisloading(false);
        setMessageError(err.response.data.message);
        console.log(err.response.data.message);
      });
    console.log(data);

    if (data.message === "success") {
      setisloading(false);
      navigate("/login");
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema: yupValidation,
  });

  return (
    <>
    <Helmet>
      <title>Register Page</title>
    </Helmet>
      <div className="bg-main-light px-5 py-4 w-75 mx-auto shadow-lg rounded-3">
        <h2>Register Now :</h2>

        {MessageError? (
            <div className="alert alert-danger">{MessageError}</div>
          ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control mt-1 mb-4"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

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
            className="form-control mt-1 mb-4"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          <label htmlFor="rePassword">rePassword :</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            className="form-control mt-1 mb-4"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}

          <label htmlFor="phone">Phone :</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="form-control mt-1 mb-4"
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}

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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
