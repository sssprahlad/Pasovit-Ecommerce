const db = require("../../config/db");

module.exports = {
  findByUser: (email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
  },

  registerUserDetails: (userName, email, hashedPassword, callback) => {
    db.run(
      `INSERT INTO users (user_name, email, password) VALUES(?, ?, ?)`,
      [userName, email, hashedPassword],
      callback
    );
  },

  createCart: (userId, callback) => {
    db.run(`INSERT INTO cart (user_id) VALUES(?)`, [userId], callback);
  },
};
