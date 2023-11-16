const controllers = require("../controllers/order.controller")
const express = require("express")
const router = express.Router();

router.post("/createOrder/:id",controllers.createOrder)
router.get("/getOrder/:id",controllers.findOneOrder)
router.put("/updateOrder/:id",controllers.updateOneOrder)



module.exports  =  router;
