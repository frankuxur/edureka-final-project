const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationcontroller");

// localhost:3500/locations
router.get("/", locationController.locations);

module.exports = router;
