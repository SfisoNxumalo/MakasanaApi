const db = require("../models/index")
const User = db.user
const Product = db.product
exports.createProduct = async (req, res)=>{
    const  businessId = req.params.id
    const business = await User.findById(businessId);
        if (!business) {
        return res.status(404).json({ message: 'not found' });
    }
    const { title, price,description, conduction,catgory, image, quantity} =req.body
    


    const newProduct = await new Product({
        business:businessId,
        title,
        price,
        image,
        description,
        catgory,
        conduction,
        quantity,
    });
    const savedProduct= await newProduct.save();
    res.status(201).json(savedProduct);
}


exports.findOne = (req, res) => {
    Product.findById(req.params.id)
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
  


exports.updateOne = (req, res) =>{
    const id = req.params.id;
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


exports.BusinessProduct = (req,res)=>{
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
  



