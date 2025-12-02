import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Cart.css";
import { MdOutlineCancel } from "react-icons/md";
import {
  UPDATE_ADD_TO_CART_API,
  GET_ALL_TO_CART_API,
  API_BASE_URL,
  DELETE_ADD_TO_CART_API,
  ADD_ORDER_ITEM_API,
} from "../../../constants/constants";
import SnackbarPopup from "../../../constants/Snackbar";

const Cart = () => {
  const [cartItemsList, setCartItemsList] = useState();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const getCartItems = async () => {
    const userId = localStorage.getItem("userId");

    const response = await fetch(`${GET_ALL_TO_CART_API}/${userId}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
    setCartItemsList(data);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleIncreaseQuantity = async (cartId, productId, quantity) => {
    const response = await fetch(UPDATE_ADD_TO_CART_API, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItemId: parseInt(cartId),
        quantity: parseInt(quantity) + 1,
      }),
    });

    const data = await response.json();
    console.log(data);
    getCartItems();
  };

  const handleDecreseQuantity = async (cartId, productId, quantity) => {
    const response = await fetch(UPDATE_ADD_TO_CART_API, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItemId: parseInt(cartId),
        quantity: parseInt(quantity) - 1,
      }),
    });

    const data = await response.json();
    console.log(data);
    getCartItems();
  };

  const handleDeleteCartItem = async (id) => {
    const response = await fetch(`${DELETE_ADD_TO_CART_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    getCartItems();
    if (data.status === 200) {
      setSnackbar({
        open: true,
        message: data.message,
        severity: "error",
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!window.confirm("Are you sure confirm your orders")) {
      return;
    }

    const userId = localStorage.getItem("userId");
    console.log(userId, "userid");

    const response = await fetch(`${ADD_ORDER_ITEM_API}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data, "order placed.");
  };

  return (
    <div className="main-common-container">
      <Navbar />
      <div className="main-sub-cont">
        <div className="my-cart-container">
          <div className="remove-btn-container">
            <h2>My Cart</h2>
            <button className="remove-all-btn">Remove All</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItemsList?.cartItems?.map((eachCartItem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="product-img-cont">
                        <img
                          src={`${API_BASE_URL}/uploads/${eachCartItem?.product_image}`}
                          alt="product-logo"
                          className="cart-product-img"
                        />
                        <h3 className="cart-product-title">
                          {eachCartItem?.product_name}
                        </h3>
                      </div>
                    </td>
                    <td>
                      <div className="product-img-cont">
                        <button
                          type="button"
                          className="cart-quantity-btn"
                          // disabled={eachCartItem?.quantity === 1}
                          onClick={() => {
                            handleDecreseQuantity(
                              eachCartItem?.cartItemId,
                              eachCartItem?.productId,
                              eachCartItem?.quantity
                            );
                          }}
                        >
                          -
                        </button>
                        <p>{eachCartItem?.quantity}</p>
                        <button
                          type="button"
                          className="cart-quantity-btn"
                          onClick={() => {
                            handleIncreaseQuantity(
                              eachCartItem?.cartItemId,
                              eachCartItem.productId,
                              eachCartItem?.quantity
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>{eachCartItem.price}/-</td>
                    <td>
                      <button
                        className="cancel-btn"
                        onClick={() =>
                          handleDeleteCartItem(eachCartItem?.cartItemId)
                        }
                      >
                        <MdOutlineCancel />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="total-container">
            <h2>Total</h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h3>{cartItemsList?.total}.00/-</h3>
              <button className="order-btn" onClick={handlePlaceOrder}>
                place order
              </button>
            </div>
          </div>
        </div>
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

export default Cart;
