const express = require('express')
const menuController = require('../controller/menu')

const router = express.Router();

router.get('',menuController.getAllMenu)

module.exports = router;