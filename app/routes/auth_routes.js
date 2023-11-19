
const BusinessController = require("../controllers/business_access")
const CustomerController = require("../controllers/customer_access")

const express = require("express");
const router = express.Router();

// Business sign up / inroutes
router.post("/business/signup", BusinessController.signup)
router.post("/business/signin", BusinessController.signin)

// Business sign up / in routes
router.post("/customer/signup", CustomerController.signup)
router.post("/customer/signin", CustomerController.signin)

module.exports = router
