

const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        title : {
            type:String,
            required: true,
            minLength: 2
        },
        image: {
            type:String,
            lowercase:true
        },
        description:{
            type:String,
            lowercase:true
        },
        category:{
            type:String,
            lowercase:true
        },
        price:Number,
        condition:{
            type:String,
            lowercase:true
        },
        quantity:Number,
       
        promo :{
            onPromo:Boolean,
            promoDesc: {
                type:String,
            },
            newPrice:Number,
            startDate:Date,
            endDate:Date
        },
        added: {
            type:Date, 
            required: true,
            immutable: true,
            default: new Date()
        },
        updated: {
            type:Date, 
            required: true,
            default: () => new Date()
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business"
        }
    })
)

module.exports = Product