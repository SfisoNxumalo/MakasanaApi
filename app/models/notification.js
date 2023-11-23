const mongoose = require("mongoose");

const Notification = mongoose.model(
    "Notification",
    new mongoose.Schema({
        title:String,
        message:String,
        business: { type: mongoose.Schema.Types.ObjectId, ref: "Business"},
        Date:{
            type:Date, 
            required: true,
            default: () => new Date()
        },
        viewed: Boolean,
    })

)

module.exports = Notification