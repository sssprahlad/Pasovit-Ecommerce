const db = require("../../config/db");

module.exports = {
  addCartItems: (cartId, productId, quantity, callback) => {
    db.get(
      `SELECT * FROM cartItems WHERE cart_id = ?  AND product_id = ?`,
      [cartId, productId],
      (err, row) => {
        if (err) return callback(err);
        if (row) {
          const newQuantity = row.quantity + quantity;
          db.run(
            `UPDATE cartItems SET quantity = ? WHERE cart_id = ?  AND product_id = ? `,
            [newQuantity, cartId, productId],
            callback
          );
        } else {
          db.run(
            `INSERT INTO cartItems (cart_id, product_id, quantity) VALUES(?,?,?)`,
            [cartId, productId, quantity],
            callback
          );
        }
      }
    );
  },

  getCartItemByCartId: (userId, callback) => {
    const query = `
    SELECT 
      cartItems.id AS cartItemId,
      cartItems.quantity,
      products.id AS productId,
      products.product_name,
      products.price,
      products.product_image,
      products.product_stock,
      products.description,
      products.size
    FROM cartItems
    INNER JOIN cart ON cartItems.cart_id = cart.id
    INNER JOIN products ON cartItems.product_id = products.id
    WHERE cart.user_id = ?
  `;

    db.all(query, [userId], callback);
  },

  updateCartItem: (cartItemId, quantity, callback) => {
    db.run(
      `UPDATE cartItems
     SET quantity = ?
     WHERE id = ?`,
      [quantity, cartItemId],
      callback
    );
  },

  deleteCartItem: (cartItemId, callback) => {
    db.run(`DELETE from cartItems WHERE id = ?`, [cartItemId], callback);
  },
};
