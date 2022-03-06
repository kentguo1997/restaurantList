// Include mongoose
const mongoose = require('mongoose')


// connect to database by mongoose
mongoose.connect(process.env.MONGODB_URI)


// get db connection 
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


// export db to let restaurantSeeder use this file to create default data
module.exports = db