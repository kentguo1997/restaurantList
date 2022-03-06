// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const passport = require('passport')
const router = express.Router()


// Setting routes (/auth)
// sending request to facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// facebook's callback
router.get('/facebook/callback', passport.authenticate('facebook',{
  successRedirect: '/',
  failureRedirect:'/users/login'
}) )



// export router 
module.exports = router