

const mongoose = require("mongoose");

const User = mongoose.model(
    "Product",
    new mongoose.Schema({
        productName : String,
        image: String,
        prouductDescription:String,
        productCatgory:String,
        price:String,
        conduction:String,
        quantity:String,
        businesId:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]

    })

)