

const mongoose = require("mongoose");

const Cart = mongoose.model(
    "Cart",
    new mongoose.Schema({
        business:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
        title : String,
        image: String,
        catgory:String,
        price:Number,
    })

)

module.exports = Cart