const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv').config();

// const authRouter = require("../app/routers/auth.route")
// const productRouter = require("../app/routers/product.route")
const AllRoutes = require("../app/routers/routes")

const db = require("./db/db.config");
const connectDB = require("./db/connect_db");

connectDB();

const app = express()

app.use(cors());
app.use(express.json())

const port = process.env.PORT || db.port

app.use(express.json())

app.use("/makasana-api", AllRoutes)

// app.get("/makasana-api/" ,(req ,res) =>{
//     res.json({message: req.body})
// })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})