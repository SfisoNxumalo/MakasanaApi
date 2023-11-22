const mongoose = require("mongoose");

const Cart = mongoose.model(
    "Cart",
    new mongoose.Schema({
        orderNo:String,
        business: { type: mongoose.Schema.Types.ObjectId, ref: "Business"},
        User: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        title : String,
        price:Number,
        orderId:String,
        processed:String,
        quantity:Number
    })

)

module.exports = Cart