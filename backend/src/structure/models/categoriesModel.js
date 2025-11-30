const db = require("../../config/db");

module.exports = {
  createCategory: (categoryName, callback) => {
    db.run(
      `INSERT INTO categories(category_name) VALUES(?)`,
      [categoryName],
      callback
    );
  },

  getCategoryById: (categoryId, callback) => {
    db.get(`SELECT * FROM categories WHERE id = ?`, [categoryId], callback);
  },

  updateCategory: (categoryName, categoryId, callback) => {
    db.run(
      `UPDATE categories SET category_name = ? WHERE id = ?`,
      [categoryName, categoryId],
      callback
    );
  },

  getAllCategories: (callback) => {
    db.all(`SELECT * FROM categories`, callback);
  },

  deleteCategory: (categoryId, callback) => {
    db.run(`DELETE FROM categories WHERE id = ?`, [categoryId], callback);
  },
};
