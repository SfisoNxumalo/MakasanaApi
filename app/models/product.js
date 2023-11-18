

const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        title : String,
        image: String,
        description:String,
        catgory:String,
        price:Number,
        conduction:String,
        quantity:Number,
        business:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]

    })

)

module.exports = Product