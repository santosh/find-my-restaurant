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
    return res.status(201).send(restaurantResp)

  } catch (error) {
    console.log("Error while creating a new restaurant", error.message);
    return res.status(500).send({
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
    return res.status(500).send({
      message: "Some error occured while fetching the Restaurants"
    })
  }
}

exports.getAllCategories = (req, res) => {
  try {
    Restaurant.distinct('category', (err, categories) => {
      return res.status(200).send(categories);

    })

  } catch (err) {
    console.log("Error while fetching categories", err.message);
    return res.status(500).send({
      message: "Some error occurred while fetching Categories"
    })
  }
}

exports.getRestaurantByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName
    const restaurants = await Restaurant.find({ category: categoryName })
    return res.status(200).send(restaurants)
  } catch (err) {
    console.log("Error while fetching restaurants", err.message);
    return res.status(500).send({
      message: "Some error occured while fetching the Restaurant"
    })
  }
}

exports.getRestaurantById = async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.find({ _id: id })
    return res.status(200).send(restaurant)
  } catch (err) {
    console.log("Restaurant not found", err.message);
    return res.status(404).send({
      message: "No Restaurant found with the given ID"
    })
  }
}

// getRestaurantByRating returns a list of restaurant with restaurant having 
// rating equal or greater than the passed ratingValue parameter.
exports.getRestaurantByRating = async (req, res) => {

  try {
    const ratingValue = req.params.ratingValue
    const restaurants = await Restaurant.find({ rating: { $gte: ratingValue } })
    return res.status(200).send(restaurants)
  } catch (err) {
    console.log("Error while fetching restaurants", err.message);
    return res.status(500).send({
      message: "Some error occured while fetching the Restaurant"
    })
  }
}
