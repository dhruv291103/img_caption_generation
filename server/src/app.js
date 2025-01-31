const express = require("express")
const cors = require("cors")


const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });



const dotenv = require('dotenv')
const app = express();
const db = require("../config/conn");
const route = require("../Router/user.router")
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT|| 3000;
dotenv.config();


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// ----------prediction logic--------------------
// const upload = multer({ dest: 'uploads/' });

const { spawn } = require('child_process');

app.post('/caption', upload.single('image'), (req, res) => {
    const filePath = req.file.path;
    console.log("File uploaded to:", filePath);

    const pythonProcess = spawn('python', ['predict.py', filePath]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.send(data.toString().trim());
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            res.status(500).send('Error generating caption');
        }
        fs.unlinkSync(filePath); // Delete the uploaded file after processing
    });
});







// // Caption generation endpoint
// app.post('/caption', upload.single('image'), (req, res) => {
//     const filePath = req.file.path;
//     console.log("File uploaded to:", filePath);

//     const command = `python predict.py ${filePath}`;
//     console.log("Running command:", command);

//     exec(command, (error, stdout, stderr) => {
//         if (error) {
//             console.error("Execution error:", error);
//             console.error("stderr:", stderr);
//             return res.status(500).send('Error generating caption');
//         }

//         console.log("stdout:", stdout);
//         fs.unlinkSync(filePath); // Delete the uploaded file after processing
//         res.send(stdout.trim());
//     });
// });

// ------------------------------

app.use("/", route);  //router use case line

app.get("/",(req,res)=>{
    res.send("Server is running fast....")
})

app.listen(`${process.env.PORT}`, ()=>{
    console.log(`Server is running on port ${PORT}`);
})









