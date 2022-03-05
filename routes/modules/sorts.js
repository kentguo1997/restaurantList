// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()


// Include restaurant model to get data and show on homepage
const Restaurant = require('../../models/restaurant')

// router setting ('/sorts')
router.get('/nameZtoA', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }) 
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


router.get('/category', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })  
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


router.get('/location', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })  
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


// export router 
module.exports = router