// Include packages in the project
const express = require('express')
const app = express()
require('./config/mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

// Define server related variables
const port = 3000


// setting template engine
app.engine('handlebars', exphbs({ extname: 'handlebars', defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting app use for included sources
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



// start and listen the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})