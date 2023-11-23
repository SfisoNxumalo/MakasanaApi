// const db = require("../index")
// const Cart = require("../models/cart.model");
// const db = require("../models/index")
// const User = db.user
// const Order = db.orders

const Order = require("../models/order")
const Business = require("../models/business")
const Product = require("../models/product")
const User = require("../models/customer")
const Notification = require("../models/notification")


exports.SaveOrder = async (req, res) => {

    const customerId = req.business;

    const NotiForBusiness = [];
  
    const customer = await User.findById(customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'not found' });
    }

    const NewOrderId = "MKA" + new Date().getTime()

    while(true){
      
      const orderID = await Order.findOne({orderNo:NewOrderId});
      
      if (!orderID) {
        break;
      }

      NewOrderId = "MKA" + new Date().getTime()
    }

    const orderDetails = req.body.orders

    for(let currentorder of orderDetails){
      currentorder.orderNo = NewOrderId
      currentorder.User = customerId
      currentorder.order_status = "pending"

      const { orderNo,
        business,
        User,
        productId,
        title,
        price,
        order_status,
        quantity } = currentorder

      const order = new Order({
        orderNo,
        business,
        User,
        productId,
        title,
        price,
        order_status,
        quantity
      });

      await order.save().then(() => {
        console.log("Saved", order.title)
        if(!NotiForBusiness.includes(business)){
          NotiForBusiness.push(business)
        }
      })
      .catch((err) => {
        console.log("failed to save", order.title)
        return res.status(400).json({ message: 'Failed' })
      })
    }

    for(let thebusiness of NotiForBusiness){

        const NewNotification = new Notification({
                title:"Yey!, New Order Received",
                message:"You have received a new order",
                business: thebusiness, 
                viewed: false,
            });

            await NewNotification.save();
    }

    return res.status(200).json({ message: 'successful' })

}

exports.ViewOrders = async(req, res) => {

  const customerId = req.business;

  const customer = await User.findById(customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'not found' });
    }

    // const category = req.params.category;
  
    const orders = await Order.find({User:customerId})

    if(!orders){
      return res.status(200).json({message: "Invalid"})
    }
  
    res.status(200).json({message: orders});
}

exports.ViewBusinessOrders = async(req, res) => {

  const businessId = req.business;

  const business = await User.findById(businessId);
  
    if (!business) {
      return res.status(404).json({ message: 'not found' });
    }

    // const category = req.params.category;
  
    const orders = await Order.find({business:businessId})

    if(!orders){
      return res.status(200).json({message: "Invalid"})
    }
  
    res.status(200).json({message: orders});
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