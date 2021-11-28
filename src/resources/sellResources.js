// Modules
const express = require("express");
const SellResources = express.Router();

//Controllers
const { SellControllers } = require("../controllers");

//All sell resources
SellResources.get("/", SellControllers.getAllSells);
SellResources.post("/", SellControllers.createSell);
SellResources.put("/", SellControllers.updateSell);

module.exports = SellResources;
