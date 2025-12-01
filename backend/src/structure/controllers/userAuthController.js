// require("dotenv").config({ path: "../../.env" });
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userAuthModel");

exports.register = (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password)
    return res
      .status(400)
      .json({ status: 400, message: "All Fields are required." });

  try {
    User.findByUser(email, async (err, existingUser) => {
      if (err)
        return res
          .status(500)
          .json({ status: 500, message: "Data base error" });

      if (existingUser) {
        return res
          .status(400)
          .json({ status: 400, message: "User Already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      User.registerUserDetails(userName, email, hashedPassword, (err) => {
        if (err)
          return res
            .status(500)
            .json({ status: 500, message: "failed to register user." });

        return res
          .status(200)
          .json({ status: 200, message: "User Register Successfully." });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, message: "user register failed." });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ status: 400, message: "All fields are required." });
  }

  try {
    User.findByUser(email, async (err, existingUser) => {
      if (err)
        return res
          .status(500)
          .json({ status: 500, message: "Data base error" });

      if (!existingUser) {
        return res.status(400).json({ status: 400, message: "Invalid user." });
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        return res
          .status(400)
          .json({ status: 400, message: "Invalid pasword." });
      }

      const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const userId = existingUser.id;
      User.createCart(userId, (err) => {
        if (err)
          return res
            .status(500)
            .json({ status: 500, message: "Data base error" });
      });

      return res
        .status(200)
        .json({
          status: 200,
          message: "User login Successfully.",
          token,
          userId: userId,
        });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, message: "user login failed." });
  }
};
