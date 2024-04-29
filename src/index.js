const express = require("express");
const cors = require("cors");
const helment = require("helmet");
const emailRouter = require("./routers/emailRouter");
const functions = require("firebase-functions")

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(helment())

var corsOptions = {
    origin: ["http://127.0.0.1:5500","https://gmapandroid-153521.web.app","http://localhost:3000"],
    optionsSuccessStatus: 200 // For legacy browser support
    }
    
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.get("/",(req,res)=>{
    return res.send({
        message:"Home page is here"
    })
})
app.use("/api/v1/",emailRouter)


// app.listen(PORT,()=>{   
//     console.log(`Server is running on port ${PORT}`);
// })

exports.api = functions.https.onRequest(app);

