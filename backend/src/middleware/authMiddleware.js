require("dotenv").config({ path: "../.env" });

const jwt = require("jsonwebtoken");

const authMiddlewar = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(400).json({ message: "No token provided." });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expire token" });
  }
};

module.exports = authMiddlewar;
