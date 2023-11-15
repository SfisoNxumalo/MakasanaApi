// app.js
require('dotenv').config();

// Accessing environment variables
const dbHost = process.env.MONGO_URI;


module.exports ={
    url : dbHost
 }