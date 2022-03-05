// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()

// Include passport 
const passport = require('passport')

// Include User Model
const User = require('../../models/user')

// router setting ('/users')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: true,
  failureRedirect: '/users/login'
}))


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const name = req.body.name || ''
  const { email, password, confirmPassword } = req.body
  let error = ''

  
  if (password !== confirmPassword) {
    error = 'Password do not match Confirm Password!' 
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      error
    })
  }

  User.findOne({email})
    .then( user => {
      // the user already exists 
      if (user) {
        error =  'The user already exists!' 
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          error
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


// Logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logged out successfully!')
  res.redirect('/users/login')
})


// export router 
module.exports = router