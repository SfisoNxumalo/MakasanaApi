const Product = require("../models/product")
const User = require("../models/customer")
const Cart = require("../models/cart.model")

exports.createCart = async (req, res)=>{

  const customerId = req.business;
  
    const customer = await User.findById(customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'not found' });
    }

    const {title, price,catgory, image} = req.body
    
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