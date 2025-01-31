const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            trim:true,
            uppercase:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
        },
        date:{
            type:String,
            required:true,
        },
        cardNumber:{
            type:Number,
            required:true,
            minLength:16,
            select:false,
            copy:false
        },
        cvvNumber:{
            type:Number,
            required:true
        },
        amount:{
            type:Number,
            required:true
        }

},{timestamps:true});

const payment = new mongoose.model("payment",paymentSchema);
module.exports = payment;