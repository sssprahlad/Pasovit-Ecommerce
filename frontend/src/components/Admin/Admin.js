import React, { useState, useEffect, use } from "react";
import Navbar from "../Navbar/Navbar";
import "./Admin.css";
import AddCategories from "./AddCategories/AddCategories";
import AddProducts from "./AddProducts/AddProducts";
import {
  ALL_CATEGORIES_API,
  ALL_PRODUCTS_API,
  DELETE_CATEGORIES_API,
  DELETE_PRODUCT_API,
  UPDATE_CATEGORIES_API,
  UPDATE_PRODUCT_API,
} from "../../constants/constants";
import { CircularProgress } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const Admin = () => {
  const [selectFiler, setSelectFilter] = useState("");
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [productPopup, setProductPopup] = useState(false);
  const [ordersPopup, setOrdersPopup] = useState(false);
  const [categoriesList, setCategoriesList] = useState();
  const [productsList, setProductsList] = useState();
  const [editCategory, setEditCategory] = useState();
  const [categoryNameDetails, setCategoryNameDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoriesTableStatus, setCategoryTableStatus] = useState(false);
  const [editingCategory, setEditingCategory] = useState();
  const [editProductId, setEditProductId] = useState();
  const [productsTableStatus, setProductsTableStatus] = useState(false);
  const [editingProductDetails, setEditingProductDetails] = useState();
  const [page, setPage] = useState(1);

  const handleFilterChange = (e) => {
    setSelectFilter(e.target.value);
    const activeOption = e.target.value;
    console.log(activeOption, "active");

    console.log(categoryNameDetails, "details");

    switch (activeOption) {
      case "category":
        setCategoryPopup(true);
        setProductPopup(false);
        setOrdersPopup(false);
        setCategoryTableStatus(true);
        setProductsTableStatus(false);
        break;

      case "product":
        setCategoryPopup(false);
        setProductPopup(true);
        setOrdersPopup(false);
        setCategoryTableStatus(false);
        setProductsTableStatus(true);
        break;

      case "orders":
        setCategoryPopup(false);
        setProductPopup(false);
        setOrdersPopup(true);
        setCategoryTableStatus(false);
        setProductsTableStatus(false);
        break;

      default:
        setCategoryTableStatus(false);
        setProductsTableStatus(false);
        break;
    }
  };

  const fetchCategories = async () => {
    const response = await fetch(ALL_CATEGORIES_API, {
      method: "GET",
    });

    const data = await response.json();
    setCategoriesList(data?.categoriesList);
  };

  const fetchProducts = async () => {
    const response = await fetch(`${ALL_PRODUCTS_API}?page=${page}&limit=10`, {
      method: "GET",
    });

    const data = await response.json();
    setProductsList(data?.products);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [page]);

  const handleEditCategory = (category) => {
    setEditCategory(category.id);
    setEditingCategory(category);
  };

  console.log(editCategory, editingCategory);

  const handleCancelEditCategory = () => {
    setEditCategory();
  };

  const handleSaveCategory = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${UPDATE_CATEGORIES_API}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ categoryName: editingCategory.category_name }),
      });

      const data = await response.json();
      setLoading(false);
      setEditCategory();
      fetchCategories();
      console.log(data, "post product");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    const response = await fetch(`${DELETE_CATEGORIES_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    fetchCategories();
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setEditingProductDetails(product);
  };

  const handleCancelEditProduct = () => {
    setEditProductId();
  };

  const handleSaveProduct = async (id) => {
    setLoading(true);
    try {
      const formProductDetails = new FormData();
      formProductDetails.append(
        "productName",
        editingProductDetails.product_name
      );
      formProductDetails.append("price", editingProductDetails.price);
      formProductDetails.append(
        "productImage",
        editingProductDetails.product_image
      );
      formProductDetails.append(
        "productStock",
        editingProductDetails.product_stock
      );
      formProductDetails.append(
        "categoryId",
        editingProductDetails.category_id
      );
      formProductDetails.append(
        "description",
        editingProductDetails.description
      );
      formProductDetails.append("size", editingProductDetails.size);

      const response = await fetch(`${UPDATE_PRODUCT_API}/${id}`, {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        //   //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
        body: formProductDetails,
      });

      const data = await response.json();
      setLoading(false);
      setEditProductId();
      fetchProducts();
      console.log(data, "post product");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const response = await fetch(`${DELETE_PRODUCT_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    fetchProducts();
  };

  const categoriesTableViews = () => {
    return (
      <div>
        {categoriesList?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categoriesList?.map((eachCategory, index) => (
                <tr key={eachCategory?.id}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className={
                        editCategory === eachCategory.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editCategory !== eachCategory.id}
                      value={
                        editCategory === eachCategory.id
                          ? editingCategory.category_name || ""
                          : eachCategory?.category_name
                      }
                      onChange={(e) => {
                        setEditingCategory({
                          ...editingCategory,
                          category_name: e.target.value,
                        });
                      }}
                    />
                  </td>
                  <td>
                    {editCategory === eachCategory.id ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          margin: "0 auto",
                          padding: "0px",
                        }}
                      >
                        <Tooltip title="Save">
                          <button
                            className="btn-save"
                            onClick={() => handleSaveCategory(eachCategory?.id)}
                          >
                            {loading ? (
                              <CircularProgress
                                size={12}
                                className="circular-color"
                              />
                            ) : (
                              "Save"
                            )}
                          </button>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <button
                            className="btn-cancel"
                            onClick={handleCancelEditCategory}
                          >
                            Cancel
                          </button>
                        </Tooltip>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          margin: "0 auto",
                          padding: "0px",
                        }}
                      >
                        <Tooltip title="Edit">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditCategory(eachCategory)}
                          >
                            Edit
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteCategory(eachCategory?.id)
                            }
                          >
                            Delete
                          </button>
                        </Tooltip>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              padding: "1rem",
              background: "white",
            }}
          >
            "No Categories"
          </div>
        )}
      </div>
    );
  };

  const productsTableViews = () => {
    return (
      <div>
        {productsList?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Product Image</th>
                <th>Product Sttock</th>
                <th>Category Id</th>
                <th>Description</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {productsList?.map((eachProduct, index) => (
                <tr key={eachProduct?.id}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className={
                        editProductId === eachProduct.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editProductId !== eachProduct.id}
                      value={
                        editProductId === eachProduct.id
                          ? editingProductDetails.product_name || ""
                          : eachProduct?.product_name
                      }
                      onChange={(e) => {
                        setEditingProductDetails({
                          ...editingProductDetails,
                          product_name: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      type="text"
                      className={
                        editProductId === eachProduct.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editProductId !== eachProduct.id}
                      value={
                        editProductId === eachProduct.id
                          ? editingProductDetails.price || ""
                          : eachProduct?.price
                      }
                      onChange={(e) => {
                        setEditingProductDetails({
                          ...editingProductDetails,
                          price: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      type="file"
                      className={
                        editProductId === eachProduct.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      //  readOnly={editProductId !== eachProduct.id}
                      // value={
                      //   editProductId === eachProduct.id
                      //     ? editingProductDetails.product_image || ""
                      //     : eachProduct?.product_image
                      // }
                      onChange={(e) => {
                        setEditingProductDetails({
                          ...editingProductDetails,
                          product_image: e.target.files[0],
                        });
                      }}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      type="text"
                      className={
                        editProductId === eachProduct.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editProductId !== eachProduct.id}
                      value={
                        editProductId === eachProduct.id
                          ? editingProductDetails.product_stock || ""
                          : eachProduct?.product_stock
                      }
                      onChange={(e) => {
                        setEditingProductDetails({
                          ...editingProductDetails,
                          product_stock: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      type="text"
                      className={
                        editProductId === eachProduct.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editProductId !== eachProduct.id}
                      value={
                        editProductId === eachProduct.id
                          ? editingProductDetails.category_id || ""
                          : eachProduct?.category_id
                      }
                      onChange={(e) => {
                        setEditingProductDetails({
                          ...editingProductDetails,
                          category_id: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      type="text"
                      className={
                        editProductId === eachProduct.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editProductId !== eachProduct.id}
                      value={
                        editProductId === eachProduct.id
                          ? editingProductDetails.description || ""
                          : eachProduct?.description
                      }
                      onChange={(e) => {
                        setEditingProductDetails({
                          ...editingProductDetails,
                          description: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td>
                    {" "}
                    <input
                      type="text"
                      className={
                        editProductId === eachProduct.id
                          ? "editable-input"
                          : "readonly-input"
                      }
                      readOnly={editProductId !== eachProduct.id}
                      value={
                        editProductId === eachProduct.id
                          ? editingProductDetails.size || ""
                          : eachProduct?.size
                      }
                      onChange={(e) => {
                        setEditingProductDetails({
                          ...editingProductDetails,
                          size: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td>
                    {editProductId === eachProduct.id ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          margin: "0 auto",
                          padding: "0px",
                        }}
                      >
                        <Tooltip title="Save">
                          <button
                            className="btn-save"
                            onClick={() => handleSaveProduct(eachProduct?.id)}
                          >
                            {loading ? (
                              <CircularProgress
                                size={12}
                                className="circular-color"
                              />
                            ) : (
                              "Save"
                            )}
                          </button>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <button
                            className="btn-cancel"
                            onClick={handleCancelEditProduct}
                          >
                            Cancel
                          </button>
                        </Tooltip>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          margin: "0 auto",
                          padding: "0px",
                        }}
                      >
                        <Tooltip title="Edit">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditProduct(eachProduct)}
                          >
                            Edit
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteProduct(eachProduct?.id)}
                          >
                            Delete
                          </button>
                        </Tooltip>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              padding: "1rem",
              background: "white",
            }}
          >
            "No Products"
          </div>
        )}
        <div className="pagination-container">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <FaAngleLeft />
          </button>
          {page}
          <button onClick={() => setPage(page + 1)}>
            <FaAngleRight />{" "}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="main-common-container">
      <Navbar />
      <div className="main-sub-container column-direction">
        <div className="search-dropdown-container">
          <div className="search-container">
            <input type="search" placeholder="Search product..." />
          </div>
          <div className="filter-container">
            <select
              className="filter-select"
              // value={filter}
              onChange={(e) => handleFilterChange(e)}
            >
              <option>select</option>
              <option value="category">Add Category</option>
              <option value="product">Add Product</option>
              <option value="orders">Orders</option>
            </select>
          </div>
        </div>
        <div className="category-table-container">
          {categoriesTableStatus && categoriesTableViews()}
        </div>

        <div className="category-table-container">
          {productsTableStatus && productsTableViews()}
        </div>
      </div>

      {categoryPopup && (
        <AddCategories
          setCategoryPopup={setCategoryPopup}
          fetchCategories={fetchCategories}
          // setCategoryNameDetails={setCategoryNameDetails}
        />
      )}

      {productPopup && (
        <AddProducts
          setProductPopup={setProductPopup}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
};

export default Admin;
