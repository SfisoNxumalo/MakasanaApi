const db = require("../index")
const User = db.user
const Order = db.order


exports.createOrder = async (req, res)=>{


    //add Cart Id later to get user cart
    const  businessId = req.params.id;
    const userId = req.params.id;
    businessId = await User.findById(businessId);
        if (!businessId) {
        return res.status(404).json({ message: 'Business not found' });
    }


    userId = await User.findById(userId);
        if (!userId) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { price, orderStatus , contactNumber, quantity} = req.body
    


    const newOrder = await new Order({

        //cartId
        businessId,
        userId,
        price,
        quantity,
        orderStatus,
        contactNumber
    });
    const savedOrder= await newOrder.save();
    res.status(201).json(savedOrder);
}


exports.findOneOrder = (req, res) => {
    Order.findById(req.params.id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Order with id not found" + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Order with id=" + id });
      });
  };
  


  exports.updateOneOrder = (req, res) =>{
    const id = req.params.id;
    Order.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Order with id=${id}. Maybe Order was not created!`
          });
        } else res.send({ 
          message: "Order was updated successfully." 
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the Order with id=" + id
        });
      });
};