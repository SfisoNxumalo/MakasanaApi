const orderController = require("../controllers/order.controller")
const ProductController = require("../controllers/product.contollers")
const validateToken = require("../middleware/ValidateToken");

const express = require("express")
const router = express.Router();

//  Business Products routes
// router.use(validateToken)
// router.get("/products", validateToken, ProductController.GetBusinessProducts)
router.get("/my-products", validateToken, ProductController.ViewMyProducts)
router.get("/view-product/:id", validateToken, ProductController.ViewOneProduct)
router.post("/create-product", validateToken, ProductController.createProduct)
// router.get("/getById/:id",validateToken, ProductController.findOne)
router.put("/update/:id", validateToken, ProductController.updateOne)

// 
router.post("/createOrder/:id", validateToken, orderController.createOrder)
router.get("/getOrder/:id", validateToken, orderController.findOneOrder)
router.put("/updateOrder/:id", validateToken, orderController.updateOneOrder)

module.exports = router;