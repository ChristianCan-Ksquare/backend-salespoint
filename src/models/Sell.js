const mongoose = require("mongoose");

const SellSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  total: {
    type: Number,
    required: true,
    trim: true,
  },
  products: [
    {
      productId: Number,
      quantity: Number,
      name: String,
    },
  ],
  date: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
});

const Sell = mongoose.model("Sell", SellSchema);

module.exports = Sell;
