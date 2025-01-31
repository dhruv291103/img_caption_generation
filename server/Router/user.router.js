const {signup,login,logout, payments,contacts,update, forgotPassword, resetPassword} = require('../controller/user.controller');
const {userAuth}  = require("../middleware/user.middleware.js")
const express = require("express")
const route = express.Router()

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", userAuth, logout);
route.post("/update", userAuth, update);
route.post("/payment", userAuth, payments);
route.post("/contact",userAuth, contacts)
route.post("/forgot-password", userAuth, forgotPassword)
route.post("/reset-password/:token", userAuth, resetPassword)

module.exports = route;
