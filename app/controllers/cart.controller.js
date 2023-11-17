const db = require("../models/index")
const Cart = db.cart
const User = db.user


exports.createCart = async (req, res)=>{
    // const  businessId = req.params.id
    // const business = await User.findById(businessId);
    //     if (!business) {
    //     return res.status(404).json({ message: 'Not found ' });
    // }
    const {title, price,catgory, image} =req.body
    
   const newCart = await new Cart({
    title,
    price,
    image,
    catgory
   })

    const savedCart= await newCart.save();
    res.status(201).json(savedCart);
}


exports.findOne = (req, res) => {
    Cart.findById(req.params.id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Post with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Post with id=" + id });
      });
  };
  
  exports.findAll = (req, res) => {
    Cart.find()
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Post with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Post with id=" + id });
      });
  };