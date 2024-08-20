// Description: This file contains the routes for the authentication of the user.
// The routes are used to register a new user and to login an existing user.

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const registrationMiddleware = require("../middlewares/registrationMiddleware");
const loginMiddleware = require("../middlewares/loginMiddleware");
const userController = require('../controllers/userController');


router.post('/register',registrationMiddleware ,authController.register);
router.post('/login', authController.login);

module.exports = router; // router is exported to be used in app.js