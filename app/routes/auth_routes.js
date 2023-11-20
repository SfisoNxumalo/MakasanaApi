
const BusinessController = require("../controllers/business_auth_controller")
const CustomerController = require("../controllers/customer_auth_controller")

const express = require("express");
const router = express.Router();

// Business sign up / inroutes
router.post("/business/signup", BusinessController.signup)
router.post("/business/signin", BusinessController.signin)

// Business sign up / in routes
router.post("/customer/signup", CustomerController.signup)
router.post("/customer/signin", CustomerController.signin)

module.exports = router
