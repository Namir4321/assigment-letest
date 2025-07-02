const express = require("express");
const router = express.Router();
const authController = require("../Controller/AuthController");
router.post("/register", authController.postregisteruser);
router.post("/login", authController.postloginUser);

module.exports = router;
