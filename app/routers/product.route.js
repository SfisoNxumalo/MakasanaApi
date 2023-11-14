const controllers = require("../controllers/product.contollers")
const verifySigup = require("../middleware/verifySignup")
const express = require("express")
const router = express.Router();

router.post("/create/:id",controllers.createProduct)
router.get("/getById/:id",controllers.findOne)
router.put("/update/:id",controllers.updateOne)



module.exports  =  router;
