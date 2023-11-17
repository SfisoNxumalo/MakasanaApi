
const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        contactNumber:String,
        orderStatus:String,
        price:Number,
        quantity:Number,
        businessId:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        userId:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        cartId:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]



    })

)

module.exports = Order