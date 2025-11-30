const db = require("../../config/db");
const { route } = require("../routers/userAuthRouter");

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
};


