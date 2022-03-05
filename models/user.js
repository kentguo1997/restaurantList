// define the Schema of users' data
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UsersSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


// export this Schema for other files' use
module.exports = mongoose.model('User', UsersSchema)