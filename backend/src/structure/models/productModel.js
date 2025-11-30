const db = require("../../config/db");

module.exports = {
  addProduct: (
    productName,
    price,
    productImage,
    productStock,
    categoryId,
    description,
    size,
    callback
  ) => {
    db.run(
      `INSERT INTO products (product_name, price, product_image, product_stock, category_id, description, size) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [
        productName,
        price,
        productImage,
        productStock,
        categoryId,
        description,
        size,
      ],
      callback
    );
  },

  getAllProducts: (callback) => {
    db.all(`SELECT * FROM products`, callback);
  },

  deleteProduct: (productId, callback) => {
    db.run(`DELETE FROM products WHERE id = ?`, [productId], callback);
  },

  getProductById: (productId, callback) => {
    db.get(`SELECT * FROM products WHERE id = ?`, [productId], callback);
  },

  updateProduct: (
    productName,
    price,
    productImage,
    productStock,
    categoryId,
    description,
    size,
    productId,
    callback
  ) => {
    db.run(
      `UPDATE products SET product_name = ?, price = ?, product_image = ?, product_stock = ?, category_id = ?, description = ?, size = ? WHERE id = ?`,
      [
        productName,
        price,
        productImage,
        productStock,
        categoryId,
        description,
        size,
        productId,
      ],
      callback
    );
  },

  categoryFilters: (categoryId, callback) => {
    db.all(
      `SELECT * FROM products WHERE category_id = ?`,
      [categoryId],
      callback
    );
  },
};
