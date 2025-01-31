const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
        email:{
            type:String,
            // unique:true,
            required:true,
            lowercase:true,
            trim:true
        },
        subject:{
            type:String,
            required:true,
        },
        message:{
            type:String,
            required:true,
        },
},{timestamps:true});

const contact = new mongoose.model("contact",contactSchema);
module.exports = contact;