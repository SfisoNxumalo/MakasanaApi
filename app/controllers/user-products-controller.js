const Product = require("../models/product")
const User = require("../models/customer")

exports.ViewCateProducts = async (req, res) => {
    const customerId = req.business;
  
    const customer = await User.findById(customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'not found' });
    }

    const category = req.params.category;
  
    const product = await Product.find({category:category})

    if(!product){
      return res.status(200).json({message: "Invalid"})
    }
  
    return res.status(200).json(product);
    
  }

  exports.ViewOneProduct = async (req, res) => {

    const id = req.params.id;

    // console.log("ll", id)

  
    const customerId = req.business;
  
    const customer = await User.findById(customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'user not found' });
    }

    const product = await Product.findById(id).populate("business");
  
    if(!product){
      return res.status(404).json({message: "Product not found2"})
    }
  
    // if(product.business._id != businessId){
    //   return res.status(400).json({message: "Unauthorized"})
    // }
    // else{
      return res.status(200).json(product)
    // }
    
  }

  exports.ViewBusinessProducts = async (req, res) => {
       
    const customerId = req.business;
 
    const customer = await User.findById(customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'not found' });
    }

    const businessId = req.params.id;
    const product = await Product.find({business:businessId})

    if (!product) {
      return res.status(404).json({ message: 'No products not found'});
    }
    else{
      return res.status(200).send(product);
    }
  
    
    
  }