const db = require("../../config/db");

module.exports = {
  createOrder: (userId, callback) => {
    db.run(`INSERT INTO orders (user_id) VALUES (?)`, [userId], function (err) {
      if (err) return callback(err);
      callback(null, this.lastID);
    });
  },

  getCartItems: (userId, callback) => {
    const query = `
      SELECT 
        cartItems.quantity,
        products.id AS productId
      FROM cartItems
      INNER JOIN cart ON cartItems.cart_id = cart.id
      INNER JOIN products ON cartItems.product_id = products.id
      WHERE cart.user_id = ?
    `;
    db.all(query, [userId], callback);
  },

  insertOrderItem: (orderId, productId, quantity, callback) => {
    db.run(
      `INSERT INTO orderItems (order_id, product_id, quantity) VALUES (?, ?, ?)`,
      [orderId, productId, quantity],
      callback
    );
  },

  getOrderItemByOrderId: (userId, callback) => {
    const query = `
    SELECT 
      orderItems.id AS orderItemId,
      orderItems.quantity,
      products.id AS productId,
      products.product_name,
      products.price,
      products.product_image,
      products.product_stock,
      products.description,
      products.size
    FROM orders
    INNER JOIN orderItems ON orderItems.order_id = orders.id
    INNER JOIN products ON orderItems.product_id = products.id
    WHERE orders.user_id = ?
  `;
    db.all(query, [userId], callback);
  },

  deleteOrderItem: (orderItemId, callback) => {
    db.run(`DELETE FROM orderItems WHERE id = ?`, [orderItemId], callback);
  },
  getUserEmail: (userId, callback) => {
    const query = `SELECT email FROM users WHERE id = ?`;
    db.get(query, [userId], callback);
  },
};
