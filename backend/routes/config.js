const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const imagePath = __dirname + "./images";

const userRoute = require("./userroute");
const locationRoute = require("./locationroute");
const restaurantRoute = require("./restaurantroute");
const paymentRoute = require("./paymentroute");
const imageRoute = require("./imageroute");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.use("/images", express.static(imagePath));

app.use("/userdetail", userRoute);
app.use("/locations", locationRoute);
app.use("/restaurants", restaurantRoute);
app.use("/payment", paymentRoute);
app.use("/images", imageRoute);

module.exports = app;
