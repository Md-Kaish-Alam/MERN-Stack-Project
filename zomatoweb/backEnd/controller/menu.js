const restaurantsMenu = require('../models/menu.js')

exports.getMenuByRestaurant = (req,res) => {
    let filter={
        restaurantName: req.params.rName
    }
    restaurantsMenu.find()
        .then(result => {
            res.status(200).json({
                message: "Restaurants Menu fetched successfully",
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