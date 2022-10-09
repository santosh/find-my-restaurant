const Restaurant = require("../models/restaurant.model")

exports.createRestaurant = async (req, res) => {
  // read the restaurant input
  const restaurantObj = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    imageURL: req.body.imageURL,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rating
  }

  // store restaurant data to DB
  try {
    const restaurantCreated = await Restaurant.create(restaurantObj)

    // return response
    const restaurantResp = {
      name: restaurantCreated.name,
      description: restaurantCreated.description,
      category: restaurantCreated.category,
      imageURL: restaurantCreated.imageURL,
      location: restaurantCreated.location,
      phone: restaurantCreated.phone,
      rating: restaurantCreated.rating,
      _id: restaurantCreated._id,
      createdAt: restaurantCreated.createdAt,
      updatedAt: restaurantCreated.updatedAt,
      __v: restaurantCreated.__v
    }
    res.status(201).json(restaurantResp)

  } catch (error) {
    console.log("Error while creating a new restaurant", error.message);
    res.status(500).json({
      message: "Some error occurred while creating the Restaurant"
    })
  }

}
