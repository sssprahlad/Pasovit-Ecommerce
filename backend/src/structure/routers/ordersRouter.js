const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.post("/add/order-item/:id", ordersController.addOrderItemDetails);
router.get("/get/order-items/:id", ordersController.getAllOrdersItems);
router.delete(
  "/delete/order-item/:id",
  ordersController.deleteOrderItemDetails
);

router.get("/admin-all-orders", ordersController.AdminOrdersList);

module.exports = router;
