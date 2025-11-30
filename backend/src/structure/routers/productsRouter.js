const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const upload = require("../../uploads/uploads");

router.post(
  "/admin/add-products",
  upload.single("productImage"),
  productsController.addProductsDetails
);
router.get("/all-products", productsController.getAllProductsDetails);
router.patch(
  "/product/:id",
  upload.single("productImage"),
  productsController.updateProductDetails
);
router.delete("/product/:id", productsController.deleteProductDetails);

router.get("/products/category/:id", productsController.categoryFilterDetails);

module.exports = router;
