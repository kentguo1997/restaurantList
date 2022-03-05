// Include express and adopt the method of express.Router() provided by express
const express = require('express')
const router = express.Router()


// router setting ('/users')
router.get('/login', (req, res) => {
  res.render('login')
})


// export router 
module.exports = router