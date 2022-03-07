// For using MONGODB_URI from .env in mongoose.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Include mongoose.js & Models & restaurant.json
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user') 
const restaurantsList = require('../../restaurant.json')

// Include bcryptjs
const bcrypt = require('bcryptjs')

// Define seed users
const SEED_USERS = [
  {
    name: 'seedUser1', 
    email: 'user1@example.com',
    password: '12345678', 
    ownedRestaurants: restaurantsList.results.slice(0, 3)

  }, 
  {
    name: 'seedUser2',
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurants: restaurantsList.results.slice(3)
  }
]

// create data
db.once('open', () => {
  // Create User
  Promise.all(Array.from(SEED_USERS, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then( user => {
        const userId = user._id
        seedUser.ownedRestaurants.forEach(restaurant => {
          restaurant['userId'] = userId
        })
        return Restaurant.create(seedUser.ownedRestaurants)
      })
  })).then(() => {
    console.log('done')
    process.exit()
  })
})

