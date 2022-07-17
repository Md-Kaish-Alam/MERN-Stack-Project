const restaurantsMealType = require('../models/mealType.js')

exports.getMealTypes = (req,res) => {
    restaurantsMealType.find()
        .then(result => {
            res.status(200).json({
                message : "Restaurants Meal type Data fetched",
                data : result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "not fetched",
                error : error
            })
        })
}