import style from "./ResetPassword.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import { string, object } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { baseUrl } from "../baseUrl";

export default function ResetPassword() {
  const [isloading, setisloading] = useState(false);
  const [MessageError, setMessageError] = useState("");
  let navigate = useNavigate();

  // Yup resetPasswordValidation
  const resetPasswordValidation = object({
    email: string()
      .required("Email is required")
      .email("InValid Email Address"),
    newPassword: string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase..."
      ),
  });

  // Authentication using formik
  async function handleResetPassword(values) {
    setisloading(true);

    await axios
      .put(
        `${baseUrl}api/v1/auth/resetPassword`,
        values
      )
      .then((response) => {
        if (response?.data?.token ) {
          setisloading(false);
          toast.success("Password Reset Successfully", { duration: 2000 });
          navigate('/login')
        }
        console.log(response);
      })
      .catch((err) => {
        setisloading(false);
        setMessageError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleResetPassword,
    validationSchema: resetPasswordValidation,
  });

  return (
    <>
      <Helmet>
        <title>Reset_Password</title>
      </Helmet>
      <div className="bg-main-light p-4 my-4 w-75 mx-auto shadow-lg rounded-3">
        <h3 className="my-4">Reset New Password :</h3>

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

          <label htmlFor="newPassword">New Password :</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            className="form-control mt-1 mb-2"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger">{formik.errors.newPassword}</div>
          ) : null}

          {isloading ? (
            <button type="button" className="btn bg-main text-white mt-3">
              <i className="fas fa-spinner fa-spin text-white"></i>
            </button>
          ) : (
            <button
              type="submit"
              className=" btn bg-main text-white mt-3"
              disabled={!(formik.dirty && formik.isValid)}
            >
              Reset Password
            </button>
          )}
        </form>
      </div>
    </>
  );
}
