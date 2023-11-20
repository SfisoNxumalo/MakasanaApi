// const orderController = require("../controllers/order.controller")
const BusProductController = require("../controllers/product_contollers")
const validateToken = require("../middleware/ValidateToken");
const CusProductCon = require("../controllers/user-products-controller")

const express = require("express")
const router = express.Router();

//  Business Products routes
router.get("/business/my-products", validateToken, BusProductController.ViewMyProducts)
router.get("/business/view-product/:id", validateToken, BusProductController.ViewOneProduct)
router.post("/business/create-product", validateToken, BusProductController.createProduct)
router.put("/business/update/:id", validateToken, BusProductController.updateOne)

// User products
router.get("/products/:category", CusProductCon.ViewCateProducts)
router.get("/products/:category/:id", CusProductCon.ViewOneProduct)

// 
// router.post("/createOrder/:id", validateToken, orderController.createOrder)
// router.get("/getOrder/:id", validateToken, orderController.findOneOrder)
// router.put("/updateOrder/:id", validateToken, orderController.updateOneOrder)

module.exports = router;