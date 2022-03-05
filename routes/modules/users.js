// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()


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
  res.send('Register')
})




// export router 
module.exports = router