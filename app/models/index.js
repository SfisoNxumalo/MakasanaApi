const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const dbConfig = require("../db/db.config")


const db ={};

db.mongoose = mongoose
db.user = require("./user.model")
db.role = require("./role.model")
db.product = require("./product.model")
db.cart   = require("./cart.model")

db.url = dbConfig.url

db.ROLES= ["user", "business"]

module.exports = db