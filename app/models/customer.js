const mongoose = require("mongoose");

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        name: {
            type:String, 
            required: true,
            lowercase:true,
            minLength: 2
        },
        email: {
            type:String, 
            required: true,
            lowercase:true ,
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
        },
        password: {
            type:String, 
            required: true,
            minLength: 7
        },
        role:{
            type:String, 
            required: true,
            lowercase:true,
            immutable: true,
            default: "customer" 
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
    })

)

module.exports = Customer