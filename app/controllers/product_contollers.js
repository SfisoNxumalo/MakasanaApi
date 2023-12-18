// const db = require("../index")

// const User = db.user
// const Product = db.product

const Website = require("../models/website")

const imageUploader = require("../controllers/Image-upload")

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
        return res.status(403).json({ message: 'not found' });
    }

    const {title, price, description, condition, category, quantity, promo} = req.body;

   
    if(!title || !price || !description || !condition || !category || !quantity){
      return res.status(402).json({message: "MISSING"})
    }

    // console.log(req.body.title)
    // console.log(req.files.image)

    const ImageLink = await imageUploader.UploadImage(req.files.image);

    // console.log(ImageLink.Location)
    // console.log(req.files.image)
    
    const newProduct = new Product({
        business:businessId,
        title,
        price:Number(price), 
        image:String(ImageLink.Location),
        description,
        category,
        condition,
        quantity:Number(quantity),
        promo:JSON.parse(promo)
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
    return res.status(404).json({ message: 'business not found' });
  }

  const product = await Product.findById(id).populate("business");

  if(!product){
    return res.status(404).json({message: "Product not found"})
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

    const {title, price, description, condition, category, image, quantity, promo} = req.body;

    if(!title || !price || !description || !condition || !category || !image || !quantity || !id){
     return res.status(400).json({message: "Missing values"})
    }

    // const product = Product.findById(id)

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
      .then(data => {
        if (!data) {
         return res.status(404).send({
            message: `Cannot update Post with id=${id}. Maybe Post was not created!`
          });
        } else return res.send({ 
          message: "Product was updated successfully." 
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Error updating the Post with id=" + id
        });
      });
};


exports.BusinessProduct = async(req,res)=>{
  const business = req.params.id;
 
  var condition = business ? { business: { $regex: new RegExp(business), $options: "i" } } : {};
 
  Product.find({business})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};
  
exports.CreateWebsite = async (req, res) => {

  const businessId = req.business;

    const business = await Business.findById(businessId);

    if (!business) {
        return res.status(403).json({ message: 'not found' });
    }

    const website = await Website.find({business:businessId});

    if (website && website.length != 0) {
      // console.log()
        return res.status(403).json({ message: 'website Already exist' });
    }

    const websiteData = new Website({
      name: business.name,
    industry: business.industry,
    email: business.email,
    address: business.address,
    phone: business.phone,
    about: req.body.about,
    services: req.body.services,
    business: business._id

    })

    const SavedWebsite = await websiteData.save();
    
    if(SavedWebsite){
      return res.status(200).json({message:"Saved"});
    }
    else{
      return res.status(200).json({message:"Failed to save"});
    }


}

exports.getWebsite = async(req, res) => {

  const website = await Website.find({business:req.params.id});

  
  if(!website || website.length == 0){
console.log(website)
    return res.status(404).json({message:"Company has no website"})
  }

  return res.status(200).json({message:website[0]})

}



