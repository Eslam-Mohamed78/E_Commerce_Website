import style from './Brands.module.css'
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { dataContext } from "../../Context/DataContext";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';


export default function Brands() {
  const [isloading, setisloading] = useState(false);

  const { getData } = useContext(dataContext);

  const [brands, setbrands] = useState(null);

  async function getBrands() {
    setisloading(true);
    const response = await getData("brands");
    if (response?.response?.data?.statusMsg === "fail") {
      // failed
      setisloading(true);
      toast.error("There are no brands");
      console.log(response);
    } else {
      // succeed => data is fetched
      setisloading(false);
      setbrands(response.data.data);
      console.log(response.data.data);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
    <Helmet>
      <title>Brands Page</title>
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
          {brands?.map((brand) => (
            <div
              key={brand._id}
              className="col-md-3 col-lg-2 col-sm-6 cursor-pointer mb-4"
            >
              <Link
                to={`/SpecificBrand/${brand._id}`}
                className=" text-reset text-decoration-none"
              >
                <img
                  src={brand.image}
                  className="w-100 rounded-2"
                  height={150}
                  alt={brand.name}
                />
                <h3 className="text-center my-3 fw-bold text-main h6">
                  {brand.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      )}


    </>
  )
}
