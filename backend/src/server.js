const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT;
const path = require("path");
const userAuthRouter = require("./structure/routers/userAuthRouter");
const productRouter = require("./structure/routers/productsRouter");
const categoryRouter = require("./structure/routers/categoriesRouter");
const cartRouter = require("./structure/routers/cartRouter");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routers

app.use("/api", userAuthRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", cartRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
