import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Home.css";
import ProductCart from "../ProductCart/ProductCart";
import {
  ALL_CATEGORIES_API,
  ALL_PRODUCTS_API,
  FILTER_CATEGORY_API,
} from "../../../constants/constants";

const Home = () => {
  const [categoriesList, setCategoriesList] = useState();
  const [productsList, setProductsList] = useState();
  const [activeFilter, setActiveFilter] = useState();

  const fetchCategories = async () => {
    const response = await fetch(ALL_CATEGORIES_API, {
      method: "GET",
    });

    const data = await response.json();
    setCategoriesList(data?.categoriesList);
  };

  const fetchProducts = async () => {
    const response = await fetch(ALL_PRODUCTS_API, {
      method: "GET",
    });

    const data = await response.json();
    setProductsList(data?.products);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleFilterCategory = async (id) => {
    setActiveFilter(id);
    const response = await fetch(`${FILTER_CATEGORY_API}/${id}`, {
      method: "GET",
    });

    const data = await response.json();
    setProductsList(data?.products);
  };

  return (
    <div className="main-common-container">
      <Navbar />
      <div className="main-sub-cont">
        <div className="filter-part">
          <h3>Filters</h3>
          <div className="filter-container-details">
            {categoriesList?.map((eachCategory) => (
              <div className="each-filter">
                <h5
                  className={
                    activeFilter === eachCategory.id ? "active-filter" : ""
                  }
                  onClick={() => handleFilterCategory(eachCategory?.id)}
                >
                  {eachCategory.category_name}
                </h5>
              </div>
            ))}
          </div>
        </div>
        <div className="products-parts">
          {productsList?.map((eachProduct) => (
            <ProductCart product={eachProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
