// Description: This file contains the routes for the authentication of the user.
// The routes are used to register a new user and to login an existing user.

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/register',authMiddleware ,authController.register);

module.exports = router; // router is exported to be used in app.js