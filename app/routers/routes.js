const orderController = require("../controllers/order.controller")
const ProductController = require("../controllers/product.contollers")
const BusinessController = require("../controllers/business_access")
const CustomerController = require("../controllers/customer_access")

const express = require("express")
const router = express.Router();

// Business sign up / inroutes
router.post("/business/signup", BusinessController.signup)
router.post("/business/signin", BusinessController.signin)

// Business sign up / in routes
router.post("/customer/signup", CustomerController.signup)
router.post("/customer/signin", CustomerController.signin)

//  Business Products routes
router.post("/create/:id",ProductController.createProduct)
router.get("/getById/:id",ProductController.findOne)
router.put("/update/:id",ProductController.updateOne)

// 
router.post("/createOrder/:id",orderController.createOrder)
router.get("/getOrder/:id",orderController.findOneOrder)
router.put("/updateOrder/:id",orderController.updateOneOrder)

module.exports = router;