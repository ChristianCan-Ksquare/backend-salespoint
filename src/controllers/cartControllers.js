// Models
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get all products from cart
const getCart = async (req, res) => {
  const cart = await Cart.find({});
  try {
    if (cart.length !== 0) {
      res.status(200).json(cart[0]);
    } else {
      res.status(404).json({ Error: "There are no cart right now!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add new cart
const createCart = async (req, res) => {
  const newCart = new Cart({
    products: [],
  });

  try {
    await newCart.save().then(
      () => res.status(201).json(newCart),
      () => {
        res.status(400).json({
          Error: "Error",
        });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update cart
const updateCart = async (req, res) => {
  const { body } = req;

  let products = [];

  for (let i = 0; i < body.products.length; i++) {
    const product = await Product.findOne({ id: body.products[i].productId });

    products.push({
      productId: product.id,
      quantity: body.products[i].quantity,
      name: product.name,
      price:
        parseFloat(product.price, 10) * parseInt(body.products[i].quantity, 10),
    });
  }

  try {
    const cart = await Cart.find({});
    if (!cart[0]) {
      res.status(404).json({ Error: "Cart not found" });
    } else {
      await Cart.findByIdAndUpdate(cart[0]._id, {
        products: products,
      }).then(
        () => res.status(200).json({ Message: "Cart sucessfully updated" }),
        () => {
          res.status(400).json({
            Error: "Error",
          });
        }
      );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getCart,
  createCart,
  updateCart,
};
