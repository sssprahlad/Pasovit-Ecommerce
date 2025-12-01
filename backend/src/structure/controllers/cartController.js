const cartModel = require("../models/cartModel");

exports.addCartItemDetails = (req, res) => {
  const { cartId, productId, quantity } = req.body;
  console.log(req.body, "cartItems");

  if (!cartId || !productId || !quantity) {
    return res
      .status(500)
      .json({ status: 500, message: "all fields are required." });
  }
  cartModel.addCartItems(cartId, productId, quantity, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });

    return res
      .status(200)
      .json({ status: 200, message: "product add to cart", totalPrice: "" });
  });
};

exports.getAllCartItems = (req, res) => {
  const userId = req.params.id;

  cartModel.getCartItemByCartId(userId, (err, cartItemRows) => {
    if (err) return res.status(500).json({ message: "Database error" });

    let total = 0;

    for (let i = 0; i < cartItemRows.length; i++) {
      total +=
        parseInt(cartItemRows[i].quantity) * parseInt(cartItemRows[i].price);
    }

    res.status(200).json({
      status: 200,
      message: "get cartItems.",
      cartItems: cartItemRows,
      total: total,
    });
  });
};

exports.updateCartItemDetails = (req, res) => {
  const { cartItemId, quantity } = req.body;
  console.log(req.body);

  if (cartItemId == null || quantity == null) {
    return res
      .status(400)
      .json({ status: 400, message: "cartItemId and quantity are required." });
  }

  cartModel.updateCartItem(cartItemId, quantity, (err) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Database error." });
    }

    res.status(200).json({
      status: 200,
      message: "Cart item updated successfully.",
    });
  });
};

exports.deleteCartItemDetails = (req, res) => {
  const cartItemId = req.params.id;
  console.log(cartItemId, "delete item");

  cartModel.deleteCartItem(cartItemId, (err) => {
    if (err)
      return res.status(500).json({ status: 500, message: "Database error." });

    res.status(200).json({
      status: 200,
      message: "delete cartItems successfully.",
    });
  });
};
