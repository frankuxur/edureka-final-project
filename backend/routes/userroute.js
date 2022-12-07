const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

router.get("/authorise", usercontroller.authorise);

// localhost:3500/userdetail/login
router.post("/login", usercontroller.login);

// localhost:3500/userdetail/signup
router.post("/signup", usercontroller.signup);

router.get("/getuserdetails", usercontroller.getUserDetails);

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjY5MjQ1OTM0LCJleHAiOjE2NjkyNDk1MzR9
//   .zgucBrhJ1 -
//   cHQvQNbMRQ -
//   LxG38CbRz63WXCcAnPGcDk;
