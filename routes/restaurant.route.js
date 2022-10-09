const restaurantController = require("../controllers/restaurant.controller")

module.exports = (app) => {
  app.post("/api/restaurant/add", restaurantController.createRestaurant)
  app.get("/api/restaurant/", restaurantController.getAllRestaurant)
  app.get("/api/restaurant/categories", restaurantController.getAllCategories)
  app.get("/api/restaurant/categories/:categoryName", restaurantController.getRestaurantByCategory)
  app.get("/api/restaurant/:id", restaurantController.getRestaurantById)
  app.get("/api/restaurant/rating/:ratingValue", restaurantController.getRestaurantByRating)
}
