const express = require("express");
const router = express.Router();
const path = require("path");
const currentPath = __dirname;

// localhost:3500/images/breakfast.png
// req.params -> localhost:3500/images/breakfast.png -> req.params.file_name
router.get("/:file_name", (req, res) => {
  let imageName = req.params.file_name;
  const filePath = path.join(currentPath, "../images/" + imageName);

  res.sendFile(filePath);
});

module.exports = router;
