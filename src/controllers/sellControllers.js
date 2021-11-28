// Models
const Sell = require("../models/Sell");
const Product = require("../models/Product");

// Get all products from Sell
const getAllSells = async (req, res) => {
  const sells = await Sell.find({});
  try {
    if (sells.length !== 0) {
      res.status(200).json(sells);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add new Sell
const createSell = async (req, res) => {
  const { body } = req;

  const newSell = new Sell({
    id: body.id,
    total: body.total,
    products: body.products,
    date: body.date,
    status: body.status,
  });

  try {
    const sell = await Sell.findOne({ id: body.id });
    if (!sell) {
      await newSell.save().then(
        () => res.status(201).json(newSell),
        () => {
          res.status(400).json({
            Error: "Error",
          });
        }
      );
    } else {
      res.status(400).json({
        Error: "A Sell with the same id already exists",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update Sell
const updateSell = async (req, res) => {
  const { body } = req;

  try {
    const sell = await Sell.findOne({ id: body.id });
    if (!sell) {
      res.status(404).json({ Error: "Sell not found" });
    } else {
      await Sell.findOneAndUpdate(
        { id: sell.id },
        {
          status: body.status,
        }
      ).then(
        () => res.status(200).json({ Message: "Sell sucessfully updated" }),
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
  getAllSells,
  createSell,
  updateSell,
};
