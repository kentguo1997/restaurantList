// Include packages in the project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
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
app.use(routes)



// setting static files
app.use(express.static('public'))


// start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})