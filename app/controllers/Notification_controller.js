const Notification = require("../models/notification")
const Business = require("../models/business")

exports.GetBusinessNotifications = async(req, res) => {

    const businessId = req.business;
    // console.log(businessId)
  
    const business = await Business.findById(businessId);
    
      if (!business) {
        return res.status(401).json({ message: 'Business not found' });
      }
  
      // const category = req.params.category;
    
      const notifications = await Notification.find({business:businessId})
  
      if(!notifications){
        return res.status(404).json({message: "No notifications"})
      }
    
      res.status(200).json({message: notifications});
  }