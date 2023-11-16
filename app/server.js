const express = require("express")
const cors =require("cors")
const authRouter = require("../app/routers/auth.route")
const productRouter = require("../app/routers/product.route")
const orderRouter = require("../app/routers/order.route")

const app = express()
const PORT = process.env.PORT || 2023

app.use(cors());
app.use(express.json())  // body-parser


const db = require("../app/models")
const Role = db.role

db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(() => {
    console.log("Connected to the database!");
    initial()
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


  function initial() {
    Role.estimatedDocumentCount()
    .then(count => {
        if (count === 0) {
            // Create 'user' role
            new Role({
                name: "user"
            }).save()
                .then(() => {
                    console.log("Added 'user' to roles collection");
                })
                .catch(err => {
                    console.log("Error:", err);
                });

            // Create 'admin' role
            new Role({
                name: "business"
            }).save()
                .then(() => {
                    console.log("Added 'business' to roles collection");
                })
                .catch(err => {
                    console.log("Error:", err);
                });
        }
    })
    .catch(err => {
        console.log("Error:", err);
    });

  }

app.use(express.json())  // body-parser


app.use("/app", authRouter)
app.use("/product", productRouter)
app.use("/orders", orderRouter)



app.get("/" ,(req ,res) =>{
    res.json({message:"Welcome to makasana application"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})