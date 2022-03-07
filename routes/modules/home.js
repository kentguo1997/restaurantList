// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()

// Include restaurant model
const Restaurant = require('../../models/restaurant')

// router setting ('/')
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// export router
module.exports = router
