const restaurantsMenu = require('../models/menu.js')

exports.getAllMenu = (req,res) => {
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