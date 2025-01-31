const bcrypt =  require("bcrypt");
const crypto = require("crypto")
const sendEmail = require("../utility/user.email")
const contact = require("../models/contact");
const register = require("../models/register")
const payment = require("../models/payments")
const dotenv = require("dotenv")
dotenv.config();

const signup = async(req,res)=>{
    const password = req.body.password;
    const confirmPassword = req.body.cpassword;
    try {
        if(confirmPassword===password){
            const data = new register({
                email:req.body.email,
                password:req.body.password,
            })
            const registerData = await data.save();
            return res.json({
                success:true,
                message:"Registration successful",
                data:registerData,
            });
        }
        else{
            return res.json({
                success:false,
                message:"Invalid credentials"
            })
        }
    } catch(error) {
        if(error.code === 11000){
            return res.status(409).json({
                success:false,
                code:11000,
                message:`Email already exists`
            })
        }
        console.log(`ERROR: `,error);
    }    
};


const login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(504).json({
            success:false,
            field:false,
            message:"Enter the details"
        })
    }
    const registerExists = await register.findOne({email:email});
    if(!registerExists){
        return res.status(400).json({
            success:false,
            userExists:false,
            message:"Enter correct credentials !"
        })
    }

    try {
        if(email && await bcrypt.compare(password, registerExists.password)){
            const token = await registerExists.jwtToken();
            res.cookie('token', token,{
                httpOnly:true,
                maxAge:new Date(Date.now()+2*60*60*1000),
                secure:false,
                sameSite:'Lax' || 'Strict',
                path:'/',
                domain:'localhost',
            })
            res.cookie('user', registerExists.email)

            return res.status(200).json({
                success:true,
                message:"Logged in successful",
                token:token,
                data:registerExists,
            });
        }else{
            return res.status(400).json({
                success:false,
                password:false,
                message:"Login failed, Enter the correct credentials"
            })
        }

    }catch (error) {
        console.log(`ERROR: `, error);
    }
    
};




// this code is for when user make logout request by get method like "base_url/logout" 
const logout = (req,res)=>{
    res.clearCookie('token');
    res.clearCookie('user');
    delete req.cookies.token;
    delete req.cookies.user;

    res.status(200).json({
        message:'user logout successfully'
    })
}



const contacts = async(req,res)=>{
    const {email} = req.body;
    try {
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Login failed, Invalid credentials"
            })
        }
        const userData = await register.findOne({email:email});
        if(email===userData.email){
            const cdata = new contact({
                email:req.body.email,
                subject:req.body.subject,
                message:req.body.message,
            })
            const contactData = await cdata.save();
            return res.json({
                success:true,
                message:"Form submit is successful",
                data:contactData,
            });
        }
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Login failed, Enter the correct credentials",
        })
    }
    
}


const payments = async(req,res)=>{
    const {email} = req.body;
    try {
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Login failed, email is not correct"
            })
        }
        const userdata = await register.findOne({email:email});
        if(!userdata){
            return res.status(400).json({
                success:false,
                message:"Login failed, user not found"
            })
        }
    
        if(email===userdata.email){
            const pdata = new payment({
                email:req.body.email,
                amount:req.body.amount,
                cvvNumber:req.body.cvvNumber,
                cardNumber:req.body.cardNumber,
                name:req.body.name,
                date:req.body.date,
            })
            const paymentData = await pdata.save();
            return res.json({
                success:true,
                message:"payment is successful",
                data:paymentData,
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"payment unsuccessful"
            })
        }
        
    } catch (error){
        res.status(401).json({
            success:false,
            message:"payment unsuccessful" 
        })
    }
    
};


const update = async(req,res)=>{
        const{oldPassword, newPassword, user} = req.body
        const userId = JSON.parse(user);
        try {
            if(!oldPassword){
                return res.status(400).json({
                    success:false,
                    message:"Fill the old password field"
                })
            }
        
            if(!newPassword){
                return res.status(400).json({
                    success:false,
                    message:"Fill the new password field"
                })
            }
    
            const result  = await register.findById(userId._id)
            if(!result){
                return res.status(504).json({
                    success:false,
                    message:"data not found"
                })
            }
        
            const isValidPassword = await bcrypt.compare(oldPassword, result.password)
            if(!isValidPassword){
                return res.status(400).json({
                    success:false,
                    message:"old password and new password does not match"
                })
            }
        
            result.password = newPassword
            await result.save()
            return res.status(200).json({
                success:true,
                message:"Your password changed successfully",
                result:result
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:`${error}`
            })
        }
        
}


const forgotPassword = async(req, res)=>{
    const {email} = req.body;
    if(!email){
        {
            return res.status(400).json({
                success:false,
                message:"email not found"
            })
        }
    }
    try {
        const user = await register.findOne({email:email});
        if(!user){
            {
                return res.status(400).json({
                    success:false,
                    message:"data not found"
                })
            }
    }
    const resetToken = await user.generateToken();
    await user.save()

    const resetPasswordUrl = `${process.env.CLIENT_URI}/reset-password/${resetToken}`
    const subject = 'reset Password'

    const message = `Your reset password link is given below by clicking on the link you can reset your password
                <a href=${resetPasswordUrl} target="_blank"><button type="button" style="background-color:blue; color:white; padding:10px"> Reset Password Link</button> <a/>`

    await sendEmail(email, subject, message)
    return res.status(200).json({
            success:true,
            message:`Reset Token send to ${email} successfully !`,
            resetToken:resetToken
    })
    }catch (error) {
        user.resetToken = undefined
        user.tokenExpiry = undefined
        await user.save()
        return res.status(400).json({
            success:false,
            message:"data not found"
        })
    }
}



const resetPassword = async(req,res)=>{
    const{password,cpassword}=req.body
    const{token} = req.params;
    if (!password){
        return res.status(400).json({
            success:false,
            message:"fill the details"
        }) 
    }

    if (!cpassword){
        return res.status(400).json({
            success:false,
            message:"fill the details"
        }) 
    }

    if (cpassword!=password){
        return res.status(400).json({
            success:false,
            message:"data not matched"
        }) 
    }

    try {
        const result = await register.findOne({resetToken:token, tokenExpiry:{$gt:Date.now()}});
        if(!result){
            return res.status(400).json({
                success:false,
                message:"data not found !"
            })
        }
    
        result.password = password
        result.resetToken=undefined
        result.tokenExpiry = undefined
        await result.save()
        return res.status(200).json({
            success:true,
            message:"Your password has been reset successfully !"
        })
    }
    catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    signup,
    login,
    logout,
    payments,
    contacts,
    update,
    forgotPassword,
    resetPassword,
}
