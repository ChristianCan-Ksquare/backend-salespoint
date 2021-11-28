// Models
const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  try {
    if (products.length !== 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ Error: "There are no Products right now!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get product by id
const getProductById = async (req, res) => {
  const { params } = req;
  try {
    const product = await Product.findOne({ id: params.id });
    if (product !== null) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ Error: "Product not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add new product
const createProduct = async (req, res) => {
  const { body } = req;

  const newProduct = new Product({
    id: body.id,
    name: body.name,
    price: body.price,
    description: body.description,
  });

  try {
    const product = await Product.findOne({ id: body.id });
    if (!product) {
      await newProduct.save().then(
        () => res.status(201).json(newProduct),
        () => {
          res.status(400).json({
            Error: "A Product with the same characteristics already exists",
          });
        }
      );
    } else {
      res.status(400).json({
        Error: "A Product with the same id already exists",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { body } = req;
  const { params } = req;

  try {
    const product = await Product.findOne({ id: params.id });
    if (!product) {
      res.status(404).json({ Error: "Product not found" });
    } else {
      const checkProduct = await Product.findOne({
        title: body.title,
        author: body.author,
        summary: body.summary,
        genre: body.genre,
        year: body.year,
        publisher: body.publisher,
      });
      //Si existe un producto con lo que esta en el request body y ese producto no tiene el mismo id que el producto que estoy actualizando
      if (checkProduct !== null && checkProduct.id !== product.id) {
        res.status(400).json({
          Error: "A Product with the same characteristics already exists",
        });
      } else {
        await Product.findOneAndUpdate(
          { id: product.id },
          {
            name: body.name,
            price: body.price,
            description: body.description,
          }
        ).then(
          () =>
            res.status(200).json({ Message: "Product sucessfully updated" }),
          () => {
            res.status(400).json({
              Error: "Error",
            });
          }
        );
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { params } = req;

  try {
    const product = await Product.findOne({ id: params.id });

    if (!product) {
      res.status(404).json({ Error: "Product not found" });
    } else {
      await Product.findByIdAndDelete({ _id: product._id });
      res.status(200).json({ Message: "Product sucessfully deleted!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
