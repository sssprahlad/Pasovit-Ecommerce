import React, { useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import {
  ALL_CATEGORIES_API,
  ADD_PRODUCTS_API,
} from "../../../constants/constants";
import "./AddProducts.css";

const AddProducts = ({ setProductPopup, fetchProducts }) => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    price: "",
    productImage: "",
    productStock: "",
    categoryId: "",
    description: "",
    size: "",
    // quantity: "",
  });
  const [allCategories, setAllCategories] = useState();

  const handleChangeProduct = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setProductDetails({ ...productDetails, productImage: files[0] });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const handleAddUpdateProduct = async (e) => {
    e.preventDefault();
    console.log(productDetails, "producyDetails");

    const formProductDetails = new FormData();
    formProductDetails.append("productName", productDetails.productName);
    formProductDetails.append("price", productDetails.price);
    formProductDetails.append("productImage", productDetails.productImage);
    formProductDetails.append("productStock", productDetails.productStock);
    formProductDetails.append("categoryId", productDetails.categoryId);
    formProductDetails.append("description", productDetails.description);
    formProductDetails.append("size", productDetails.size);

    try {
      const response = await fetch(ADD_PRODUCTS_API, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
        body: formProductDetails,
      });

      const data = await response.json();
      console.log(data, "post product");

      setProductDetails({
        productName: "",
        price: "",
        productImage: "",
        productStock: "",
        categoryId: "",
        description: "",
        size: "",
        // quantity: "",
      });
      setProductPopup(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    const response = await fetch(ALL_CATEGORIES_API, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data, "category data");
    setAllCategories(data?.categoriesList);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="add-project-form-container">
      <form
        className="form-container popup-container"
        onSubmit={handleAddUpdateProduct}
      >
        <div className="popup-title-cont">
          <h2>Add Product</h2>
          <MdOutlineCancel
            onClick={() => setProductPopup(false)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="productName"
              type="text"
              placeholder="enter your product"
              name="productName"
              required
              onChange={handleChangeProduct}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="price"
              type="text"
              placeholder="enter your price"
              name="price"
              required
              onChange={handleChangeProduct}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="productImage">Product Image</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="productImage"
              type="file"
              placeholder="select file"
              name="productImage"
              required
              onChange={handleChangeProduct}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="productStock">Product Stock</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="productStock"
              type="text"
              placeholder="enter your product stock"
              name="productStock"
              required
              onChange={handleChangeProduct}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Product CategoryId</label>
          <div className="input-field-container">
            <div className="add-product-filter-container">
              <select onChange={handleChangeProduct} name="categoryId">
                {" "}
                <option>select category</option>
                {allCategories?.map((eachCategory) => (
                  <option value={eachCategory.id}>
                    {eachCategory?.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Product description</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="description"
              type="text"
              placeholder="enter your product description"
              name="description"
              required
              onChange={handleChangeProduct}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="size">Product Size</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="size"
              type="text"
              placeholder="enter your category"
              name="size"
              required
              onChange={handleChangeProduct}
            />
          </div>
        </div>

        {/* <div className="form-group">
          <label htmlFor="size">Product quantity</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="size"
              type="text"
              placeholder="enter your category"
              name="size"
              required
              onChange={handleChangeProduct}
            />
          </div>
        </div> */}

        <div className="form-group">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
