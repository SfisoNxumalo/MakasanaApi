const mongoose = require("mongoose");

const Website = mongoose.model(
    "Website",
    new mongoose.Schema({
        name: {
            type:String, 
            required: true,
            lowercase:true,
            minLength: 2
        },
        business: { type: mongoose.Schema.Types.ObjectId, ref: "Business"},
        industry : {
            type:String, 
            required: true,
            lowercase:true
        },
        email: {
            type:String, 
            required: true,
            lowercase:true,
            unique:true
        },
        address:{
            type:String, 
            required: true,
            lowercase:true
        },
        phone:{
            type:String, 
            required: true,
        }
        ,
        about:{
            type:String, 
            required: true,
        }
        ,
        services:{
            type:String, 
            required: true,
        }
    })

)

module.exports = Website