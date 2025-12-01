const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/add/cart-items", cartController.addCartItemDetails);
router.get("/get/cart-items/:id", cartController.getAllCartItems);
router.patch("/update/cart-items", cartController.updateCartItemDetails);
router.delete("/delete/cartItem/:id", cartController.deleteCartItemDetails);

module.exports = router;
