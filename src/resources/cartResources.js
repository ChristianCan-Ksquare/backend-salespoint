// Modules
const express = require("express");
const CartResources = express.Router();

//Controllers
const { CartControllers } = require("../controllers");

//All cart resources
CartResources.get("/", CartControllers.getCart);
CartResources.post("/", CartControllers.createCart);
CartResources.put("/", CartControllers.updateCart);

module.exports = CartResources;
