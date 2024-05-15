import React, { useContext } from "react";
// import style from "./Checkout.module.css";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { cartId, onlinePayment } = useContext(cartContext);

  async function handleSubmit(values) {
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === "success") {
      window.location.href = response.data.session.url;
    }
    console.log(response);
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="bg-main-light px-5 py-4 my-4 w-50 mx-auto shadow-lg rounded-3">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="mb-2">
            Details :
          </label>
          <input
            type="text"
            id="details"
            name="details"
            onChange={formik.handleChange}
            value={formik.values.details}
            className="form-control mb-3"
          />

          <label htmlFor="city" className="mb-2">
            City :
          </label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="form-control mb-3"
          />

          <label htmlFor="phone" className="mb-2">
            Phone :
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="form-control mb-4"
          />

          <button type="submit" className="bg-main btn w-100 text-white">
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
