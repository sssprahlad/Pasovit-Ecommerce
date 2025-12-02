const db = require("../../config/db");
const { off } = require("../../server");

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

  getAllProducts: (limit, offset, search, callback) => {
    const searchTerm = `%${search}%`;
    db.all(
      `SELECT * FROM products WHERE product_name LIKE ? OR description LIKE ? LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, limit, offset],
      callback
    );
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

  categoryFilters: (categoryId, limit, offset, callback) => {
    db.all(
      `SELECT * FROM products WHERE category_id = ? LIMIT ? OFFSET ?`,
      [categoryId, limit, offset],
      callback
    );
  },
};
