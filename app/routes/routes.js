const orderController = require("../controllers/order.controller")
const BusProductController = require("../controllers/product_contollers")
const validateToken = require("../middleware/ValidateToken");
const CusProductCon = require("../controllers/user-products-controller")
const imgUpload = require("../controllers/Image-upload")

const express = require("express");
const Product = require("../models/product");
const router = express.Router();

//  Business Products routes
router.get("/business/my-products", validateToken, BusProductController.ViewMyProducts)
router.get("/business/view-product/:id", validateToken, BusProductController.ViewOneProduct)
router.post("/business/create-product", validateToken, BusProductController.createProduct)
router.put("/business/update/:id", validateToken, BusProductController.updateOne)

router.post("/business/save-web", validateToken, BusProductController.CreateWebsite)

router.get("/products/business/:id", validateToken, CusProductCon.ViewBusinessProducts)
// User products
router.get("/products/:category", validateToken, CusProductCon.ViewCateProducts)
router.get("/products/:category/:id", validateToken, CusProductCon.ViewOneProduct)



// user orders
router.post("/createOrder", validateToken, orderController.SaveOrder)
router.get("/view-orders", validateToken, orderController.ViewOrders)

//Business Orders
router.get("/business/view-orders", validateToken, orderController.ViewBusinessOrders)

router.get("/business/website/:id", BusProductController.getWebsite)

//AWS upload
router.post("/upload-image", imgUpload.UploadImage)

module.exports = router;