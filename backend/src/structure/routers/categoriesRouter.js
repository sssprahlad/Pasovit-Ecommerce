const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");
  
router.post(
  "/admin-add-categories",
  categoriesController.createCategoryDetails
);
router.get("/all-categories", categoriesController.getAllCategoryDetails);
router.patch("/category/:id", categoriesController.updateCategoryDetails);
router.delete("/category/:id", categoriesController.deleteCategoryDetails);

module.exports = router;
