const mongoose = require("mongoose")
require('dotenv').config()

// Define the MongoDB connection URL
// Local MongoDB server
// const mongoURL = "mongodb://127.0.0.1:27017/hotels"; // Replace 'hotels' with your specific database name
// Cloud MongoDB Atlas server
const mongoURL = process.env.mongoURL;

// Set up MongoDB connection
mongoose.connect(mongoURL)  

// Now we don't use the below code to connect mongoose to mongodb as it is outdated
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listners for database connection
db.on('connected', () => {
    console.log("Conneced to MongoDB server.");
})

db.on('error', (err) => {
    console.log("MongoDB connection error: ", err);
})

db.on('disconnected', () => {
    console.log("MongoDB disconnected.");
})

// Export the database connection
module.exports = db;