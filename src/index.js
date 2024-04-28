const express = require("express");
const cors = require("cors");
const helment = require("helmet");
const emailRouter = require("./routers/emailRouter");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helment())

const PORT = process.env.PORT || 5000;
app.get("/",(req,res)=>{
    return res.send({
        message:"Home page is here"
    })
})
app.use("/api/v1/",emailRouter)


app.listen(PORT,()=>{   
    console.log(`Server is running on port ${PORT}`);
})

