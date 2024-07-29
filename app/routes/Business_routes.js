const orderController = require("../controllers/order.controller")
const BusProductController = require("../controllers/product_contollers")
const validateToken = require("../middleware/ValidateToken");
const CusProductCon = require("../controllers/user-products-controller")
const imgUpload = require("../controllers/Image-upload")
const Notifications = require('../controllers/Notification_controller')

const express = require("express");
const router = express.Router();

//  Business Products routes
router.get("/business/my-products", validateToken, BusProductController.ViewMyProducts)
router.get("/business/view-product/:id", validateToken, BusProductController.ViewOneProduct)
router.post("/business/create-product", validateToken, BusProductController.createProduct)
router.put("/business/update/:id", validateToken, BusProductController.updateOne)
router.get("/business/notifications", validateToken, Notifications.GetBusinessNotifications)

router.post("/business/save-web", validateToken, BusProductController.CreateWebsite)

router.get("/products/business/:id", validateToken, CusProductCon.ViewBusinessProducts)

//Business Orders
router.get("/business/view-orders", validateToken, orderController.ViewBusinessOrders)
router.get("/business/website/:id", BusProductController.getWebsite)

//AWS upload
router.post("/upload-image", imgUpload.UploadImage)

module.exports = router