// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()

// Include restaurant model to get data and show on homepage
const Restaurant = require('../../models/restaurant')


// router setting ('/restaurants')

// add new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  // get attributes from req.body 
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  // get userId
  const userId = req.user._id

  return Restaurant.create({
    name,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// show restaurant's detail
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


// edit restaurant
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  // get _id from params 
  const _id = req.params.id
  
  // get userId
  const userId = req.user._id

  // get attributes from req.body 
  const { name, category, image, location, phone, google_map, rating, description } = req.body

  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description

      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})


// delete restaurant
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .then(restaurant => Restaurant.deleteOne(restaurant))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



// export router 
module.exports = router