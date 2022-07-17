const locations = require('../models/location.js')
const { stringify} = require('querystring')
exports.getAllLocations = (req, res) => {
    locations.find()
        .then(result => {
            res.status(200).json({
                message: "Restaurants Locations are fetched successfully",
                data: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "not fetched",
                error: error
            })
        })
}
