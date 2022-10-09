const restaurantController = require("../controllers/restaurant.controller")

module.exports = (app) => {
  app.post("/api/restaurant/add", restaurantController.createRestaurant)
}
