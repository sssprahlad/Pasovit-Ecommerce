const Category = require("../models/categoriesModel");

exports.createCategoryDetails = (req, res) => {
  const { categoryName } = req.body;

  Category.createCategory(categoryName, (err) => {
    if (err)
      return res.status(500).json({ status: 500, message: "Database error" });
    return res
      .status(200)
      .json({ status: 200, message: "category created successfully." });
  });
};

exports.updateCategoryDetails = (req, res) => {
  const { categoryName } = req.body;
  const categoryId = req.params.id;

  console.log(categoryId, "categoryId");

  Category.getCategoryById(categoryId, (err, getCategory) => {
    if (err)
      return res.status(500).json({ status: 500, message: "Data base error." });

    // if (!getCategory)
    //   return res
    //     .status(400)
    //     .json({ status: 400, message: "category not found" });

    Category.updateCategory(categoryName, categoryId, (err) => {
      if (err)
        return res.status(500).json({ status: 500, message: "Database error" });
      return res
        .status(200)
        .json({ status: 200, message: "category update successfully." });
    });
  });
};

exports.getAllCategoryDetails = (req, res) => {
  Category.getAllCategories((err, categoriesList) => {
    if (err)
      return res.status(500).json({ status: 500, message: "Data base error" });

    return res.status(200).json({
      status: 200,
      message: "fetch categories.",
      categoriesList: categoriesList,
    });
  });
};

  exports.deleteCategoryDetails = (req, res) => {
    const categoryId = req.params.id;
    console.log(categoryId, "delete id");

    Category.deleteCategory(categoryId, (err) => {
      if (err)
        return res.status(500).json({ status: 500, message: "data base error." });

      return res
        .status(200)
        .json({ status: "200", message: "category delete successfully." });
    });
  };
