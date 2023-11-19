// const db = require("../index")

// const User = db.user
// const Product = db.product

const Business = require("../models/business")
const Product = require("../models/product")

exports.GetBusinessProducts = async (req, res) => {
  const businessId = req.business;
  res.status(201).json({message:"New Product created"})
}

exports.createProduct = async (req, res) => 
{
    const businessId = req.business;

    const business = await Business.findById(businessId);

        if (!business) {
        return res.status(404).json({ message: 'not found' });
    }

    const {title, price, description, condition, category, image, quantity, promo} = req.body;

    if(!title || !price || !description || !condition || !category || !image || !quantity){
      return res.status(400).json({message: price})
    }
    
    const newProduct = new Product({
        business:businessId,
        title,
        price,
        image,
        description,
        category,
        condition,
        quantity,
        promo
    });

    const savedProduct = await newProduct.save();

    if(savedProduct){
      return res.status(201).json({message:"Saved"});
    }
    else{
      return res.status(201).json({message:"Failed to save"});
    }

    
}

exports.ViewMyProducts = async (req, res) => {
  const businessId = req.business;

  const business = await Business.findById(businessId);

  if (!business) {
    return res.status(404).json({ message: 'not found' });
  }

  const product = await Product.find({business:businessId})

    res.status(200).send(product);
  
}

exports.ViewOneProduct = async (req, res) => {
  const businessId = req.business;
  const id = req.params.id;

  const business = await Business.findById(businessId);

  if (!business) {
    return res.status(404).json({ message: 'not found' });
  }

  const product = await Product.findById(id).populate("business");

  if(!product){
    return res.status(200).json({message: "Invalid"})
  }

  if(product.business._id != businessId){
    return res.status(400).json({message: "Unauthorized"})
  }
  else{
    return res.status(200).json(product)
  }
  
}

exports.findOne = (req, res) => 
{
    Product.findById(req.params.id)
      .then(data => {
        if (!data)
          res.status(200).send({ message: "Not found Post with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .send({ message: "Error retrieving Post with id " + id });
      });
};

  exports.updateOne = async (req, res) => {

    const businessId = req.business;
    const id = req.params.id;

    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: 'not found' });
    }

    const product = await Product.findById(id)

    if(!product){
      return res.status(404).json({ message: 'product not found' });
    }

    if(product.business != businessId){
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {title, price, description, conduction, catgory, image, quantity, promo} = req.body;

    if(!title || !price || !description || !conduction || !catgory || !image || !quantity || !id){
      res.status(400).json({message: "Missing values"})
    }

    // const product = Product.findById(id)

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Post with id=${id}. Maybe Post was not created!`
          });
        } else res.send({ 
          message: "Product was updated successfully." 
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the Post with id=" + id
        });
      });
};