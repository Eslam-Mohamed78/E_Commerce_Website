// import style from './Categories.module.css'
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Categories() {
  const [isloading, setisloading] = useState(false);

  const { getData } = useContext(dataContext);

  const [categories, setcategories] = useState(null);

  async function getCategories() {
    setisloading(true);
    const response = await getData("categories");
    if (response?.response?.data?.statusMsg === "fail") {
      // failed
      setisloading(true);
      toast.error("There are no brands");
      console.log(response);
    } else {
      // succeed => data is fetched
      setisloading(false);
      setcategories(response.data.data);
      console.log(response.data.data);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      {isloading ? (
        <div className="d-flex justify-content-center fixed-top pt-5">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="row">
          {categories?.map((categorie) => (
            <div
              key={categorie._id}
              className="col-sm-6 col-md-4 col-lg-3 cursor-pointer mb-4"
            >
              <Link
                to={`/SpecificCategory/${categorie._id} `}
                className=" text-reset text-decoration-none"
              >
                <img
                  src={categorie.image}
                  className="w-100 rounded-2"
                  height={300}
                  alt={categorie.name}
                />
                <h3 className="text-center my-3 fw-bold text-main h6">
                  {categorie.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
