import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Home.css";
import ProductCart from "../ProductCart/ProductCart";
import {
  ALL_CATEGORIES_API,
  ALL_PRODUCTS_API,
  FILTER_CATEGORY_API,
  ADD_TO_CART_API,
} from "../../../constants/constants";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import SnackbarPopup from "../../../constants/Snackbar";

const Home = () => {
  const [categoriesList, setCategoriesList] = useState();
  const [productsList, setProductsList] = useState();
  const [activeFilter, setActiveFilter] = useState();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const response = await fetch(ALL_CATEGORIES_API, {
      method: "GET",
    });

    const data = await response.json();
    setCategoriesList(data?.categoriesList);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(
      `${ALL_PRODUCTS_API}?page=${page}&limit=10&search=${searchQuery}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setProductsList(data?.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [page, searchQuery]);

  const handleFilterCategory = async (id) => {
    setLoading(true);
    setActiveFilter(id);
    const response = await fetch(
      `${FILTER_CATEGORY_API}/${id}?page=${page}&limit=10`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setProductsList(data?.products);
    setLoading(false);
  };

  return (
    <div className="main-common-container">
      <Navbar />
      <div className="main-sub-cont">
        <div className="filter-part">
          <h3>Filters</h3>

          <div className="filter-container-details">
            <div className="form-group">
              <label htmlFor="email">Search</label>
              <div className="input-field-container">
                <IoSearchOutline style={{ height: "20px", width: "20px" }} />
                <input
                  type="search"
                  placeholder="Search product"
                  name="search"
                  required
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
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
        <div style={{ width: "100%" }}>
          {productsList?.length > 0 ? (
            <div className="products-parts">
              {productsList?.map((eachProduct) => (
                <ProductCart product={eachProduct} setSnackbar={setSnackbar} />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // flexDirection: "column",
                alignItems: "center",
                width: "100%",
                // height: "100%",
                fontWeight: "bold",
                gap: "2rem",
              }}
            >
              No Products Found.
            </div>
          )}
        </div>
      </div>
      <div className="pagination-container">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <FaAngleLeft />
        </button>
        {page}
        <button onClick={() => setPage(page + 1)}>
          <FaAngleRight />{" "}
        </button>
      </div>
      <SnackbarPopup
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
        onClose={() => setSnackbar({ open: false })}
      />
    </div>
  );
};

export default Home;
