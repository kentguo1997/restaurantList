// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()


// Include restaurant model to get data and show on homepage
const Restaurant = require('../../models/restaurant')

// router setting ('/sorts')
router.get('/nameZtoA', (req, res) => {
  Restaurant.find()  // get all data from Model
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


router.get('/category', (req, res) => {
  Restaurant.find()  // get all data from Model
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


router.get('/location', (req, res) => {
  Restaurant.find()  // get all data from Model
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


// export router 
module.exports = router