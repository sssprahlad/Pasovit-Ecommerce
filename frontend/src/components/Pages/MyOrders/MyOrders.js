import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "./MyOrders.css";
import { MdOutlineCancel } from "react-icons/md";
import {
  API_BASE_URL,
  DELETE_ORDER_ITEM_API,
  GET_ALL_ORDER_ITEMS_API,
} from "../../../constants/constants";
import SnackbarPopup from "../../../constants/Snackbar";

const MyOrders = () => {
  const [orderItemsList, setOrderItemsList] = useState();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const getOrderItems = async () => {
    const userId = localStorage.getItem("userId");

    const response = await fetch(`${GET_ALL_ORDER_ITEMS_API}/${userId}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
    setOrderItemsList(data);
  };

  useEffect(() => {
    getOrderItems();
  }, []);

  const handleDeleteOrderItem = async (id) => {
    if (!window.confirm("Are you sure, cancel order")) {
      return;
    }

    const response = await fetch(`${DELETE_ORDER_ITEM_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    getOrderItems();
    if (data.status === 200) {
      setSnackbar({
        open: true,
        message: data.message,
        severity: "error",
      });
    }
  };

  return (
    <div className="main-common-container">
      <Navbar />
      <div className="main-sub-cont">
        <div className="my-cart-container">
          <div className="remove-btn-container">
            <h2>My Orders</h2>
            {/* <button className="remove-all-btn">Remove All</button> */}
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
                  <th>Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {orderItemsList?.orderItems?.map((eachCartItem, index) => {
                  const dates = [
                    { date: "Your order will be delivered in 2 days" },
                    {
                      date: "Your order has been packed and is ready for shipping",
                    },
                    { date: "Your order is out for delivery" },
                    {
                      date: "Your order has been dispatched from the warehouse",
                    },
                    { date: "Your order will arrive tomorrow" },
                    { date: "Your order is being processed" },
                    { date: "Your order is delayed due to high demand" },
                    { date: "Your order will reach you by this weekend" },
                    { date: "Your order is currently in transit" },
                    { date: "Your order has been successfully delivered" },
                  ];

                  const randomDate =
                    dates[Math.floor(Math.random() * dates.length)];

                  return (
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
                          <p>{eachCartItem?.quantity}</p>
                        </div>
                      </td>

                      <td>{eachCartItem.price}/-</td>
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() =>
                            handleDeleteOrderItem(eachCartItem?.orderItemId)
                          }
                        >
                          <MdOutlineCancel />
                        </button>
                      </td>
                      <td>
                        <p className="order-date"> {randomDate?.date}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="total-container">
            <h2>Total Order Amount</h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h3>{orderItemsList?.total}.00/-</h3>
              {/* <button className="order-btn" onClick={handlePlaceOrder}>
                place order
              </button> */}
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

export default MyOrders;
