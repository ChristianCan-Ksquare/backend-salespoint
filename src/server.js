//Modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;

//Enabling cors
app.use(cors());

//Router
const routes = require("./routes/router");

//Middleware to parse body
app.use(express.json());

//Setting dotenv for DB_URL (local machine)
// require("dotenv").config();

//Connect to mongoose
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes
app.use(routes);
app.use("/", function (req, res) {
  res.send("Backend - Sales Point");
});
app.use((req, res) => {
  res.status(404).json({
    message: "Ups!!! Resource not found.",
  });
});

app.listen(port);
console.log("Server on port", port);
