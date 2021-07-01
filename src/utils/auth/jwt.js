const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const AppError = require('../appError')
const catchAsync = require('../catchAsync')
const User = require('../../models/userModel')

passport.use(
  new Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
    catchAsync(async function (tokenPayload, done) {
      const user = await User.findById(tokenPayload.id)
      if (!user) return done(new AppError('Unauthorized', 401), false)
      if (user.active === false) return done(new AppError('User not found', 404), false)
      delete user.password
      done(null, user)
    }
    )
  )
)