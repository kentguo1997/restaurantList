// Include passport & strategies
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

// Include bcryptjs
const bcrypt = require('bcryptjs')

// Include User Model for authentication
const User = require('../models/user')

// export as a function
module.exports = app => {
  // Initialization of Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // Setting LocalStrategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('loginError', 'User not found!'))
        }
        bcrypt.compare(password, user.password).then(isMatched => {
          if (!isMatched) {
            return done(null, false, req.flash('loginError', 'Email or Password incorrect'))
          } else {
            return done(null, user)
          }
        })
      })
      .catch(err => done(err, false))
  }))

  // Setting FacebookStrategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json

    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        // create a new user
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, null))
      })
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
