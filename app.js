// Include packages in the project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
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



// route setting 
app.get('/', (req, res) => {
  Restaurant.find()  // get all data from Model
    .lean()
    .then( restaurants => res.render('index', { restaurants })) 
    .catch(error => console.log(error))
})


app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantsList.results.find( restaurant => restaurant.id.toString() === req.params.restaurant_id ) 
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantsList.results.filter( restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.category.includes(keyword)
  })

  // Whether there are corresponding results or not 
  if(restaurants.length === 0) {
    res.render('error', { keyword: keyword })
  } else {
    res.render('index', { restaurantsList: restaurants, keyword: keyword })
  }
})

// setting static files
app.use(express.static('public'))

// start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})