import React, { useState } from "react";
import "./AddCategories.css";
import { CiLock } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { ADD_CATEGORIES_API } from "../../../constants/constants";

const AddCategories = ({ setCategoryPopup, fetchCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleAddUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(ADD_CATEGORIES_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
      });

      const data = await response.json();
      console.log(data, "post product");
      setCategoryName("");
      setCategoryPopup(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
    // setCategoryNameDetails(e.target.value);
  };

  return (
    <div className="add-project-form-container">
      <form
        className="form-container popup-container"
        onSubmit={handleAddUpdateCategory}
      >
        <div className="popup-title-cont">
          <h2>Add Category</h2>
          <MdOutlineCancel
            onClick={() => setCategoryPopup(false)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <div className="input-field-container">
            <CiLock style={{ height: "20px", width: "20px" }} />
            <input
              id="categoryName"
              type="text"
              placeholder="enter your category"
              name="categoryName"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Add Category</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategories;
