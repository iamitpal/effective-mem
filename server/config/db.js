const mongoose = require("mongoose")
require("dotenv").config()

const connectToDatabase = mongoose.connect(process.env.MONGO)

module.exports = { connectToDatabase }
