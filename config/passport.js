// Include passport & strategies
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


// Include User Model for authentication
const User = require('../models/user')


// export as a function
module.exports = app => {
  // Initialization of Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // Setting LocalStrategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  })) 

  // serialization & deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
