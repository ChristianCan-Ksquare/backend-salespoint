const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products: [
    {
      productId: Number,
      quantity: Number,
      name: String,
      price: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
