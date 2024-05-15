import style from "./ForgetPassword.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { baseUrl } from "../baseUrl";


export default function ForgetPassword() {
  const [isloading, setisloading] = useState(false);
  const [MessageError, setMessageError] = useState("");
  const [codeSent, setcodeSent] = useState(false);
  let navigate = useNavigate();

  // ====================== Forget Password  =====================

  // emailRecovery Validation
  const emailRecoveryValidation = object({
    email: string()
      .required("Email is required")
      .email("InValid Email Address"),
  });

  // Authentication using formik
  async function handleEmailRecovery(values) {
    setisloading(true);

    await axios
      .post(
        `${baseUrl}api/v1/auth/forgotPasswords`,
        values
      )
      .then((response) => {
        if (response.data.statusMsg === "success") {
          setisloading(false);
          setcodeSent(true)
          toast.success('Code Sent Successfully', { duration: 2000 })
          console.log(response);
        }
      })
      .catch((err) => {
        setisloading(false);
        setMessageError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }

  const formikEmailRecovery = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleEmailRecovery,
    validationSchema: emailRecoveryValidation,
  });

  // ========================= Reset Code =======================

  // emailRecovery Validation
  const resetCodeValidation = object({
    resetCode: string().required("Email is required")
    .matches(/^[0-9]+$/, "The reset code is only numbers..."),
  });

  // Authentication using formik
  async function handleResetCode(values) {
    setisloading(true);

    await axios
      .post(
        `${baseUrl}api/v1/auth/verifyResetCode`,
        values
      )
      .then((response) => {
        if (response.data.status === "Success") {
          console.log(response);
          setisloading(false);
          toast.success('Code Verified Successfully', { duration: 2000 })
          navigate('/ResetPassword')
          setcodeSent(false)
        }
      })
      .catch((err) => {
        setisloading(false);
        setMessageError(err.response.data.message);
        console.log(err.response.data.message);
      });

  }

  const formikResetCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleResetCode,
    validationSchema: resetCodeValidation,
  });

  return (
    <>
      <Helmet>
        <title>Forget_Password</title>
      </Helmet>
      <div className="bg-main-light p-4 my-4 w-75 mx-auto shadow-lg rounded-3">
        {codeSent ? (
          <>
            <h3 className="mb-4">Enter The Recieved Code :</h3>
            {MessageError ? (
              <div className="alert alert-danger">{MessageError}</div>
            ) : null}

            <form onSubmit={formikResetCode.handleSubmit}>
              <label htmlFor="resetCode">Reset Code :</label>
              <input
                type="text"
                name="resetCode"
                id="resetCode"
                onChange={formikResetCode.handleChange}
                onBlur={formikResetCode.handleBlur}
                value={formikResetCode.values.resetCode}
                className="form-control mt-1 mb-4"
              />
              {formikResetCode.errors.resetCode &&
              formikResetCode.touched.resetCode ? (
                <div className="alert alert-danger">
                  {formikResetCode.errors.resetCode}
                </div>
              ) : null}

              {isloading ? (
                <button type="button" className="btn bg-main text-white">
                  <i className="fas fa-spinner fa-spin text-white"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className=" btn bg-main text-white "
                  disabled={!(formikResetCode.dirty && formikResetCode.isValid)}
                >
                  Reset Code
                </button>
              )}
            </form>
          </>
        ) : (
          <>
            <h3 className="mb-4">Get Recovery Code :</h3>
            {MessageError ? (
              <div className="alert alert-danger">{MessageError}</div>
            ) : null}

            <form onSubmit={formikEmailRecovery.handleSubmit}>
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={formikEmailRecovery.handleChange}
                onBlur={formikEmailRecovery.handleBlur}
                value={formikEmailRecovery.values.email}
                className="form-control mt-1 mb-4"
              />
              {formikEmailRecovery.errors.email &&
              formikEmailRecovery.touched.email ? (
                <div className="alert alert-danger">
                  {formikEmailRecovery.errors.email}
                </div>
              ) : null}

              {isloading ? (
                <button type="button" className="btn bg-main text-white">
                  <i className="fas fa-spinner fa-spin text-white"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className=" btn bg-main text-white"
                  disabled={
                    !(formikEmailRecovery.dirty && formikEmailRecovery.isValid)
                  }
                >
                  Send Code
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </>
  );
}
