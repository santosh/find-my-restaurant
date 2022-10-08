const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  imageURL: String,
  location: String,
  phone: String,
  rating: Number
}, { timestamps: true })

module.exports = mongoose.model("Restaurant", restaurantSchema)
