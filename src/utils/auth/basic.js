const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const AppError = require('../appError')
const User = require('../../models/userModel')
const catchAsync = require('../catchAsync')

passport.use(new BasicStrategy(catchAsync(async function (email, password, done) {
  const user = await User.findOne({ email: email })
  
  if (!user) return done(new AppError('User not found', 404), false)
  if (user.active === false) return done(new AppError('User not found', 404), false)

  const valid = await user.correctPassword(password, user.password)
  if (!valid) return done(new AppError('Invalid credentials', 400), false)

  delete user.password

  return done(null, user)
})))