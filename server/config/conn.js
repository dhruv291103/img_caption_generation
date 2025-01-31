const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(`${process.env.MONGODB_URI}`,{
    useUnifiedTopology:true,
}).then((db)=>{
    console.log(`database connected to ${db.connection.host}`)
}).catch((err)=>{
    console.log(`ERROR: ${err}`)
});