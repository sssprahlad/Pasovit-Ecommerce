const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database("./Pasovit.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Database connected successfully.");
});

db.run(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
    )`
);

db.run(`CREATE TABLE IF NOT EXISTS categories(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT UNIQUE NOT NULL
  )`);

db.run(`CREATE TABLE IF NOT EXISTS products(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT NULL,
  price TEXT NULL,
  product_image TEXT NULL,
  product_stock TEXT NULL,
  category_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  size TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
  )`);

db.run(`CREATE TABLE IF NOT EXISTS cart(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);

db.run(`CREATE TABLE IF NOT EXISTS cartItems(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE

  )`);

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");
});

module.exports = db;
