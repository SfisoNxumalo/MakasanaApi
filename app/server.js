const express = require("express")
const cors = require("cors")
require('dotenv').config();
const fileUpload = require('express-fileupload')

// const authRouter = require("../app/routers/auth.route")
// const productRouter = require("../app/routers/product.route")
const AllRoutes = require("./routes/routes")
const AuthRoutes = require("./routes/auth_routes")

// const db = require("./db/db.config");
const connectDB = require("./db/connect_db");

connectDB();


const app = express()

app.use(cors());
app.use(express.json())
app.use(fileUpload())

const port = process.env.PORT || db.port

app.use(express.json({
    extended: true,
    limit:'50mb'
}))

app.use("/makasana-api", AllRoutes)
app.use("/makasana-api/auth", AuthRoutes)

// app.get("/makasana-api/" ,(req ,res) =>{
//     res.json({message: req.body})
// })

// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`)
//   function initial() {
//     Role.estimatedDocumentCount()
//     .then(count => {
//         if (count === 0) {
//             // Create 'user' role
//             new Role({
//                 name: "user"
//             }).save()
//                 .then(() => {
//                     console.log("Added 'user' to roles collection");
//                 })
//                 .catch(err => {
//                     console.log("Error:", err);
//                 });

//             // Create 'admin' role
//             new Role({
//                 name: "business"
//             }).save()
//                 .then(() => {
//                     console.log("Added 'business' to roles collection");
//                 })
//                 .catch(err => {
//                     console.log("Error:", err);
//                 });
//         }
//     })
//     .catch(err => {
//         console.log("Error:", err);
//     });

//   }
// });

app.use(express.json())  // body-parser


// app.use("/app", authRouter)
// app.use("/product", productRouter)
// app.use("/order", orderRouter)


app.get("/" ,(req ,res) =>{
    res.json({message:"Welcome to makasana application"})
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})