// The controller of routes

// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()

// Include routers
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const sorts = require('./modules/sorts')
const search = require('./modules/search')
const users = require('./modules/users')

// use routers included
router.use('/restaurants', restaurants)
router.use('/sorts', sorts)
router.use('/search', search)
router.use('/users', users)
router.use('/', home)

// export router
module.exports = router