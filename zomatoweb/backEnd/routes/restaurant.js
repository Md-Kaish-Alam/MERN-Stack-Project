const express = require('express')
const restaurantController = require('../controller/restaurant')

const router = express.Router();

router.get('',restaurantController.getAllRestaurants)
router.post('/filter/:pageNo', restaurantController.getAllRestaurantsByFilter)
router.get('/details/:rname', restaurantController.getAllRestaurantDetails)
router.get('/:cName',restaurantController.getRestaurantsByCity)
router.get('/city/:cName',restaurantController.getRestaurantsByCityName)

module.exports = router;