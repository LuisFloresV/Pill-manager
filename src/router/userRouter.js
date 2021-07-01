const express = require('express')
const router = express.Router()
const { registerUser, getMe, login } = require('../services/userService')
const passport = require('passport')

// PASSPORT STRATEGIES
require('../utils/auth/basic')
require('../utils/auth/jwt')

router.route('/register')
  .post(registerUser)

router.route('/me')
  .get(passport.authenticate('jwt', { session: false }), getMe)

router.route('/login')
  .post(passport.authenticate('basic', { session: false }), login)

module.exports = router