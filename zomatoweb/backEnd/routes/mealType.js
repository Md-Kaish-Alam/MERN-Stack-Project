const express = require('express')
const mealTypeController = require('../controller/mealType')

const router = express.Router()

router.get('', mealTypeController.getMealTypes)

module.exports = router