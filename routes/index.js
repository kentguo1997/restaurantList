// The controller of routes

// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const restaurant = require('../models/restaurant')
const router = express.Router()

// Include routers
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')

// use routers included
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)

// export router
module.exports = router