import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useState } from "react";
import "./ProductCart.css";
import { API_BASE_URL, ADD_TO_CART_API } from "../../../constants/constants";
import SnackbarPopup from "../../../constants/Snackbar";

const ProductCart = ({ product, setSnackbar }) => {
  const [quantity, setQunatity] = useState(1);
  //   const [snackbar, setSnackbar] = useState({
  //     open: false,
  //     message: "",
  //     severity: "success",
  //   });

  const handleAddProduct = async (product) => {
    console.log(product);
    const cartId = localStorage.getItem("userId");
    const productId = product.id;

    const response = await fetch(ADD_TO_CART_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      }),
    });

    const data = await response.json();
    console.log(data);
    setQunatity(1);
    setSnackbar({
      open: true,
      message: data.message,
      severity: "success",
    });
  };

  return (
    <div className="card-container">
      <div className="image-container">
        <img
          src={`${API_BASE_URL}/uploads/${product?.product_image}`}
          className="product-img"
          alt="product-img"
        />
      </div>
      <div className="title-details-container">
        <h4 className="product-title">{product?.product_name}</h4>
        <p style={{ fontSize: "0.7rem", color: "#4b5563" }}>
          {product?.description}
        </p>
        <h6 className="product-price">price : {product?.price}/-</h6>
        <h6 className="product-price">stock : {product?.product_stock}</h6>
      </div>
      <div className="buttons-container">
        <button
          className="add-to-cart"
          onClick={() => {
            handleAddProduct(product);
          }}
        >
          Add to cart
        </button>
        <div className="quantity-container">
          <button
            className="quantity-btn"
            onClick={() => setQunatity(quantity - 1)}
            disabled={quantity === 0}
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            className="quantity-btn"
            onClick={() => setQunatity(quantity + 1)}
          >
            +
          </button>
        </div>

        <button
          className="fav-button"
          //   onClick={() => handleFavouriteItem(product)}
        >
          {/* {isFavourite ? (
            <MdFavorite className="fav-icon red" style={{ color: "red" }} />
          ) : ( */}
          <MdFavoriteBorder className="fav-icon" />
          {/* )} */}
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
