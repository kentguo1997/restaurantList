// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()

// Include User Model
const User = require('../../models/user')

// router setting ('/users')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('Login')
})


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const name = req.body.name || ''
  const { email, password } = req.body
  
  User.findOne({email})
    .then( user => {
      // the user already exists 
      if (user) {
        console.log('User already exists!')
        return res.render('register', {
          name,
          email
        })
      }
      // create a new user
      User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))  
    })
})



// export router 
module.exports = router