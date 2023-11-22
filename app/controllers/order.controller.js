// const db = require("../index")
// const Cart = require("../models/cart.model");
// const db = require("../models/index")
// const User = db.user
// const Order = db.orders

const Order = require("../models/order")

exports.SaveOrder = async (req, res) => {

    const customerId = req.business;
  
    const customer = await User.findById(customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'not found' });
    }

    const order = new Order({

    });




}


// exports.createOrder = async (req, res)=>{


  
//     const  cartId = req.params.id;

//     const cart = await Cart.findById(cartId);
//         if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//     }
//     const { businessId, userId, productId, orderStatus} = req.body
    


//     const newOrder = await new Order({

//         cart : cartId,
//         businessId,
//         productId,
//         userId,
//         orderStatus
//     });
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
// }


// exports.findOneOrder = (req, res) => {
//     Order.findById(req.params.id)
//       .then(data => {
//         if (!data)
//           res.status(404).send({ message: "Order with id not found" + id });
//         else res.send(data);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .send({ message: "Error retrieving Order with id=" + id });
//       });
//   };
  


//   exports.updateOneOrder = (req, res) =>{
//     const id = req.params.id;
//     Order.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot update Order with id=${id}. Maybe Order was not created!`
//           });
//         } else res.send({ 
//           message: "Order was updated successfully." 
//         });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating the Order with id=" + id
//         });
//       });
// };