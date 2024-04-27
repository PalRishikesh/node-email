const express = require("express");
const cors = require("cors");
const helment = require("helmet");
const emailRouter = require("./routers/emailRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helment())

const PORT = 3000;

app.use("/api/v1/",emailRouter)


app.listen(PORT,()=>{   
    console.log(`Server is running on port ${PORT}`);
})

