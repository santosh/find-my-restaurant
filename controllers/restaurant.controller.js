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
    return res.status(201).json(restaurantResp)

  } catch (error) {
    console.log("Error while creating a new restaurant", error.message);
    return res.status(500).json({
      message: "Some error occurred while creating the Restaurant"
    })
  }
}


exports.getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})

    return res.status(200).send({
      restaurants: restaurants,
      message: "Restaurants fetched successfully."
    });
  } catch (err) {
    console.log("Error while fetching restaurants", err.message);
    return res.status(500).json({
      message: "Some error occured while fetching the Restaurants"
    })
  }
}

exports.getAllCategories = (req, res) => {
  try {
    Restaurant.distinct('category', (err, categories) => {
      return res.send(categories);

    })

  } catch (err) {
    console.log("Error while fetching categories", err.message);
    return res.status(500).json({
      message: "Some error occurred while fetching Categories"
    })
  }
}
