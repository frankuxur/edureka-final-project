const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantcontroller");
const filterSearch = require("../controllers/restaurantcontroller");

// localhost:3500/restaurants/getall
router.get("/getall", restaurantController.getAllList);

// localhost:3500/restaurants?location=1
// localhost:3500/restaurants?restaurant=1
router.get("/", restaurantController.getDataByLocation);

// myFilter
router.get("/filter", restaurantController.filter);

module.exports = router;
