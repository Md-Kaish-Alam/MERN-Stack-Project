const restaurants = require('../models/restaurant.js')

exports.getAllRestaurants = (req, res) => {
    restaurants.find()
        .then(result => {
            res.status(200).json({
                message: "restaurants details fetched successfully",
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

exports.getRestaurantsByCityName = (req, res) => {

    let criteria = { city_name: req.params.cName }
    restaurants.find(criteria)
        .then(result => {
            res.status(200).json({
                message: "fetched all restaurants by city name",
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

exports.getRestaurantsByCity = (req, res) => {

    let criteria = { city: req.params.cName }

    restaurants.find(criteria)
        .then(result => {
            res.status(200).json({
                message: "fetched all restaurants data by city id",
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

exports.getAllRestaurantsByFilter = (req, res) => {

    const filter = {}

    if (req.body.city_id) {
        filter.city = req.body.city_id
    }

    if (req.body.cuisine && req.body.cuisine.length > 0) {
        filter['Cuisine.name'] = { $in: req.body.cuisine }
    }



    if (req.body.lcost !=='' && req.body.lcost == 0) {
        filter.cost = {
            $lte: req.body.hcost
        }
    }else
        if(req.body.lcost && req.body.hcost) {
            filter.cost = {
                $lt: req.body.hcost,
                $gt: req.body.lcost
            }
        }


    let sort = 1

    if (req.body.sort) {
        sort: req.body.sort
    }

    //logic of pagination achieved through limit and skip method
    restaurants.find(filter).limit(2).skip(2 * (req.params.pageNo - 1)).sort({ "cost": sort })
        .then(result => {
            restaurants.find(filter).count((err,count)=>{
                if(err)
                    console.log(err)
                else
                    res.status(200).json({
                    message: "data fetched successfully",
                    data: result,
                    totalRecords: count
                })
            })
        })

        .catch(error => {
            res.status(500).json({
                message: "error in database",
                error: error
            })
        })
}

exports.getAllRestaurantDetails = (req, res) => {
    const filter = { name: req.params.rname }
    restaurants.findOne(filter)
        .then(result => {
            res.status(200).json({
                message: 'data fetched successfully',
                data: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'error fetching',
                error: error
            })
        })
}