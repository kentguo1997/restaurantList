// Include packages in the project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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


// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))


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
   const name = req.body.name
   const category = req.body.category
   const image = req.body.image
   const location = req.body.location
   const phone = req.body.phone
   const google_map = req.body.google_map
   const rating = req.body.rating
   const description = req.body.description
   
   return Restaurant.create({
     name: name, 
     category: category, 
     image: image,
     location: location,
     phone: phone,
     google_map: google_map,
     rating: rating,
     description: description
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

app.post('/restaurants/:id/edit', (req, res) => {
  // get id from params 
  const id = req.params.id
  
  // get attributes from req.body 
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  
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
app.post('/restaurants/:id/delete', (req, res) => {
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