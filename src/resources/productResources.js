// Modules
const express = require("express");
const ProductResources = express.Router();

//Controllers
const { ProductControllers } = require("../controllers");

//Middleware
const { check } = require("express-validator");

///Custom Middleware to check input data types
const validateInput = (req, res, next) => {
  const { body } = req;
  let errorArray = [];

  if (typeof body.name !== "string") {
    errorArray.push({
      message: "Ups! name should be a string!",
    });
  }
  if (typeof body.description !== "string") {
    errorArray.push({
      message: "Ups! description should be a string!",
    });
  }
  if (typeof body.price !== "number") {
    errorArray.push({
      message: "Ups! price should be a number!",
    });
  }

  if (errorArray.length === 0) {
    return next();
  } else {
    return res.status(400).json({
      error: errorArray.map((element) => {
        return element.message;
      }),
    });
  }
};

///Third Party Middleware - Express Validator
const checkProduct = [
  check("name", "name should be at least 1 character long")
    .isLength({ min: 1 })
    .trim(),
  check("description", "description should be at least 1 character long")
    .isLength({ min: 1 })
    .trim(),
  check("price", "price should be a number, bigger than 0").isFloat({
    min: 0.1,
  }),
];

const validateProduct = (req, res, next) => {
  const { validationResult } = require("express-validator");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array().map((element) => {
        return element.msg;
      }),
    });
  }
  return next();
};

//All product resources
ProductResources.get("/", ProductControllers.getAllProducts);
ProductResources.get("/:id", ProductControllers.getProductById);
ProductResources.post(
  "/",
  validateInput,
  checkProduct,
  validateProduct,
  ProductControllers.createProduct
);
ProductResources.put(
  "/:id",
  validateInput,
  checkProduct,
  validateProduct,
  ProductControllers.updateProduct
);
ProductResources.delete("/:id", ProductControllers.deleteProduct);

module.exports = ProductResources;
