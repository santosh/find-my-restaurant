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

exports.updateRestaurantById = async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findOne({ _id: id })

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ "message": "Restaurant Data is required." })
    }

    restaurant.name = req.body.name != undefined ? req.body.name : restaurant.name
    restaurant.description = req.body.description != undefined ? req.body.description : restaurant.description
    restaurant.category = req.body.category != undefined ? req.body.category : restaurant.category
    restaurant.imageURL = req.body.imageURL != undefined ? req.body.imageURL : restaurant.imageURL
    restaurant.location = req.body.location != undefined ? req.body.location : restaurant.location
    restaurant.phone = req.body.phone != undefined ? req.body.phone : restaurant.phone
    restaurant.rating = req.body.rating != undefined ? req.body.rating : restaurant.rating

    await restaurant.save()

    return res.status(200).send({ "message": "Restaurant updated successfully." })

  } catch (err) {
    console.log("Error updating restaurant", err.message);

    // the status should be 404, but the specs said to use 200
    return res.status(200).send({
      message: "No Restaurant found with the given ID"
    })
  }
}

exports.deleteRestaurantById = async (req, res) => {
  try {
    const id = req.params.id
    const restaurants = await Restaurant.find({ _id: id })

    await Restaurant.findOneAndDelete({ _id: id })

    return res.status(200).send({
      restaurant: restaurants[0],
      message: "Restaurant deleted successfully."
    })
  } catch (err) {
    console.log("Restaurant not found", err.message);

    // here message shuouldn't be "Restaurant deleted successfully", but spec said so.
    return res.status(200).send({
      restaurant: null,
      message: "Restaurant deleted successfully."
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

exports.deleteAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.deleteMany({})
    return res.status(200).send({
      restaurants: {
        "acknowledged": restaurants.acknowledged,
        "deletedCount": restaurants.deletedCount,
      },
      message: "Restaurants deleted successfully."
    })
  } catch (err) {
    console.log("Some error occured:", err.message);
    return res.status(500).send({
      message: "Some error occured while deleting the Restaurant."
    })
  }
}
