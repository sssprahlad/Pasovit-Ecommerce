const Products = require("../models/productModel");

exports.addProductsDetails = (req, res) => {
  const { productName, price, productStock, categoryId, description, size } =
    req.body;

  const productImage = req.file ? req.file.filename : null;

  console.log(req.body, productImage);

  if (
    !productName ||
    !price ||
    !productImage ||
    !productStock ||
    !categoryId ||
    !description ||
    !size
  ) {
    return res
      .status(500)
      .json({ status: 500, message: "All Fields are required" });
  }

  console.log(req.body, productImage);

  try {
    Products.addProduct(
      productName,
      price,
      productImage,
      productStock,
      categoryId,
      description,
      size,
      (err) => {
        if (err) {
          return res
            .status(400)
            .json({ status: 400, message: "failed to add product details" });
        }

        return res
          .status(200)
          .json({ status: 200, message: "product details added successfully" });
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ status: 400, message: "product details add to failed" });
  }
};

exports.getAllProductsDetails = (req, res) => {
  Products.getAllProducts((err, products) => {
    if (err)
      return res.status(500).json({ status: 500, message: "Data base error" });

    res.status(200).json({
      status: 200,
      message: "fetch products details",
      products: products,
    });
  });
};

exports.deleteProductDetails = (req, res) => {
  const productId = req.params.id;

  Products.deleteProduct(productId, (err) => {
    if (err) res.status(500).json({ status: 500, message: "Database error" });

    res
      .status(200)
      .json({ status: 200, message: "Product delete successfully." });
  });
};

exports.updateProductDetails = (req, res) => {
  const { productName, price, productStock, categoryId, description, size } =
    req.body;
  const productId = req.params.id;

  try {
    Products.getProductById(productId, (err, product) => {
      if (err)
        return res
          .status(500)
          .json({ status: 500, message: "Data base error" });

      if (!product) {
        return res
          .status(404)
          .json({ status: 404, message: "product not found" });
      }
      const productImage = req.file ? req.file.filename : product.product_image;

      Products.updateProduct(
        productName,
        price,
        productImage,
        productStock,
        categoryId,
        description,
        size,
        productId,
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ status: 500, message: "Database error" });

          return res
            .status(200)
            .json({ status: 200, message: "product update successfully" });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ status: 400, message: "product details add to failed" });
  }
};

exports.categoryFilterDetails = (req, res) => {
  const categoryId = req.params.id;

  Products.categoryFilters(categoryId, (err, products) => {
    if (err)
      return res.status(500).json({ status: 500, message: "Database error" });

    return res.status(200).json({
      status: 200,
      message: "products filtered successfully.",
      products: products,
    });
  });
};
