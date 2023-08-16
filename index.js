const express = require("express");
const app = express();
require("./db/conn");
require('dotenv').config()
const router = require("./routes/router");
const cors = require("cors");


const port =process.env.PORT


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());

app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})