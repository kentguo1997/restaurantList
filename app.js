// Include packages in the project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')



// Define server related variables
const port = 3000


// connect to database by mongoose
mongoose.connect('mongodb://localhost/restaurant_list')

// get db connection 
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


// setting template engine
app.engine('handlebars', exphbs({ extname: 'handlebars', defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting app use for included sources
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// route setting 
app.get('/', (req, res) => {
  Restaurant.find()  // get all data from Model
    .lean()
    .then( restaurants => res.render('index', { restaurants })) 
    .catch(error => console.log(error))
})

// add new restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  // get attributes from req.body 
  const { name, category, image, location, phone, google_map, rating, description} = req.body
   
  return Restaurant.create({
    name, 
    category, 
    image,
    location,
    phone,
    google_map,
    rating,
    description
  })
     .then( () => res.redirect('/') )
     .catch(error => console.log(error))
})


// show restaurant's detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  Restaurant.findById(id)
    .lean()
    .then( restaurant => res.render('show', {restaurant}) )
    .catch( error => console.log(error) )
})


// edit restaurant
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  // get id from params 
  const id = req.params.id
  
  // get attributes from req.body 
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  
  Restaurant.findById(id)
    .then(restaurant =>{
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
    .then( () => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


// delete restaurant
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id

  Restaurant.findById(id)
    .then( restaurant => Restaurant.deleteOne(restaurant) )
    .then( () => res.redirect('/') )
    .catch( error => console.log(error) )
})


// search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  let filteredRestaurants = []
  
  Restaurant.find()
    .lean()
    .then( restaurants => {
      filteredRestaurants = restaurants.filter( restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
      })
      
      // Whether there are corresponding results or not 
      if (filteredRestaurants.length === 0) {
        res.render('error', { keyword: keyword })
      } else {
        res.render('index', { restaurants: filteredRestaurants, keyword })
      }
    })
    .catch(error => console.log(error))
})


// setting static files
app.use(express.static('public'))


// start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})