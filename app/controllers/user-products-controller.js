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
  
      res.status(200).json(product);
    
  }

  exports.ViewOneProduct = async (req, res) => {
    // const businessId = req.business;
    const id = req.params.id;
  
    // const business = await Business.findById(businessId);
  
    // if (!business) {
    //   return res.status(404).json({ message: 'not found' });
    // }
  
    const product = await Product.findById(id).populate("business");
  
    if(!product){
      return res.status(200).json({message: "Invalid"})
    }
  
    // if(product.business._id != businessId){
    //   return res.status(400).json({message: "Unauthorized"})
    // }
    // else{
      return res.status(200).json(product)
    // }
    
  }