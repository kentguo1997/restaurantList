// Include mongoose.js & Restaurant Model & restaurant.json
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantsList = require('../../restaurant.json')


db.once('open', () => {
  restaurantsList.results.forEach( 
    restaurant => Restaurant.create({ 
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  )

  console.log('done')
})

