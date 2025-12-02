const ordersModel = require("../models/ordersModel");
const { sendOrderMail } = require("../../utils/mailRouter");

exports.addOrderItemDetails = (req, res) => {
  const userId = req.params.id;

  ordersModel.createOrder(userId, (err, orderId) => {
    if (err) return res.status(500).json({ message: "Database error" });

    ordersModel.getCartItems(userId, (err, cartItems) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "No items in cart" });
      }

      let inserted = 0;

      cartItems.forEach((item) => {
        ordersModel.insertOrderItem(
          orderId,
          item.productId,
          item.quantity,
          (err) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                message: "Error inserting order items",
              });
            }

            inserted++;

            if (inserted === cartItems.length) {
              ordersModel.getUserEmail(userId, async (err, row) => {
                if (err || !row)
                  return res
                    .status(500)
                    .json({ message: "Cannot find user email" });

                try {
                  await sendOrderMail(row.email, orderId);
                } catch (mailErr) {
                  console.log("Mail error:", mailErr);
                }

                return res.status(200).json({
                  status: 200,
                  message: "Order placed successfully",
                  orderId: orderId,
                });
              });
            }
          }
        );
      });
    });
  });
};

exports.getAllOrdersItems = (req, res) => {
  const userId = req.params.id;

  ordersModel.getOrderItemByOrderId(userId, (err, orderItemRows) => {
    if (err) return res.status(500).json({ message: "Database error" });

    let total = 0;

    for (let i = 0; i < orderItemRows.length; i++) {
      total +=
        parseInt(orderItemRows[i].quantity) * parseInt(orderItemRows[i].price);
    }

    res.status(200).json({
      status: 200,
      message: "get cartItems.",
      orderItems: orderItemRows,
      total: total,
    });
  });
};

exports.deleteOrderItemDetails = (req, res) => {
  const orderItemId = req.params.id;
  console.log(orderItemId, "delete orderitem");

  ordersModel.deleteOrderItem(orderItemId, (err) => {
    if (err)
      return res.status(500).json({ status: 500, message: "Database error." });

    res.status(200).json({
      status: 200,
      message: "delete orderItem successfully.",
    });
  });
};
