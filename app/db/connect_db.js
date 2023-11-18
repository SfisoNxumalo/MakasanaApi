const mongoose = require("mongoose")

const connectionString = process.env.MONGO_URI

const connectDB = async () => {
  try
  {
    console.log(connectionString)
    const connect = await mongoose.connect(connectionString);
    console.log("Connected to the database ",
    connect.connection.host,
    connect.connection.name);
  }
  catch(error)
  {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}

module.exports = connectDB

