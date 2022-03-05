// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()


// Include restaurant model to get data and show on homepage
const Restaurant = require('../../models/restaurant')


// router setting ('/search')
// search function
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  let filteredRestaurants = []
  
  // get userId
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      filteredRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
      })

      // Whether there are corresponding results or not 
      if (filteredRestaurants.length === 0) {
        res.render('error', { keyword })
      } else {
        res.render('index', { restaurants: filteredRestaurants, keyword })
      }
    })
    .catch(error => console.log(error))
})


// export router 
module.exports = router