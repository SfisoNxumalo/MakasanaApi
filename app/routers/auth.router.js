const controllers = require("../controllers/auth.contollers")
const verifySigup = require("../middleware/verifySignup")
const express = require("express")
const router = express.Router();

router.post("/signup",controllers.signup)
router.post("/signin",controllers.signin)


module.exports  =  router;
