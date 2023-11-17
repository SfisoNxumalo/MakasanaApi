

const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username : String,
        image:String,
        industry:String,
        email: String,
        address:String,
        phoneNumber:String,
        password: String,
        roles:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]

    })

)

module.exports = User
