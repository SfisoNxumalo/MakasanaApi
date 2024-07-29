const orderController = require("../controllers/order.controller")
const validateToken = require("../middleware/ValidateToken");
const CusProductCon = require("../controllers/user-products-controller")

const express = require("express");
const router = express.Router();

// User products
router.get("/products/:category", validateToken, CusProductCon.ViewCateProducts)
router.get("/products/:category/:id", validateToken, CusProductCon.ViewOneProduct)

// user orders
router.post("/createOrder", validateToken, orderController.SaveOrder)
router.get("/view-orders", validateToken, orderController.ViewOrders)


module.exports = router;