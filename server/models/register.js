const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const dotenv = require("dotenv")
const JWT = require("jsonwebtoken")
dotenv.config();
const registration = new mongoose.Schema({
        email:{
            type:String,
            unique:true,
            required:true,
            trim:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minLength:8,
        },
        resetToken:{
            type:String,
        },
        tokenExpiry:{
            type:Date,
        }

},{timestamps:true});


registration.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }else{
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }
})


registration.methods = {
    jwtToken(){
        return JWT.sign({id:this._id, email:this.email},
            process.env.SECRET_KEY,
            {expiresIn:'24h'}
        )
    },


    async generateToken(){
        const token = crypto.randomBytes(32).toString('hex');
        this.resetToken = token;
        this.tokenExpiry = Date.now() + 15 * 60 * 1000;
        return token;
    }
}

const register = new mongoose.model("register",registration);
module.exports = register;