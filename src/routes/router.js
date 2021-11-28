const express = require("express");
const router = express.Router();

// Resources
const { ProductResources } = require("../resources");
const { CartResources } = require("../resources");
const { SellResources } = require("../resources");

// All routes
router.use("/products", ProductResources);
router.use("/cart", CartResources);
router.use("/sells", SellResources);

module.exports = router;
