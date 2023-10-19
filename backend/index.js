const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const config = require("./db/config");

app.use(cors());
app.use(express.json());
const LoginRoute = require("./routes/LoginRoute");
const SignUpRoute = require("./routes/SignUpRoute");
const ProductsRoute = require("./routes/ProductsRoute");
const LikedRoute = require("./routes/LikedProductsRoute");
const CartRoute = require("./routes/CartRoute");
const FilterRoute = require("./routes/FilterRoutes");
const SearchRoute = require("./routes/SearchRoute");
const ForgotPasswordRoute = require("./routes/ForgotPasswordRoute");

app.use("/", LoginRoute);
app.use("/", SignUpRoute);
app.use("/", ProductsRoute);
app.use("/", LikedRoute);
app.use("/", CartRoute);
app.use("/", FilterRoute);
app.use("/", ForgotPasswordRoute);
app.use("/", SearchRoute);

app.get("/", (req, res) => {
  res.status(200).json("Home");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", reason.stack || reason);
  process.exit(1);
});

if (config) {
  app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`);
  });
}
