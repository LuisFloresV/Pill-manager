const express = require('express')
const router = express.Router()
const { getMe } = require('../services/userService')
const { login, registerUser, deactivateUser } = require('../services/authService')

const passport = require('passport')

// PASSPORT STRATEGIES
require('../utils/auth/basic')
require('../utils/auth/jwt')

router.route('/register')
  .post(registerUser)

// PROTECTED WITH JWT STRATEGY
router.use(passport.authenticate('jwt', { session: false }))
router.route('/deactivate')
  .post(deactivateUser)

router.route('/me')
  .get(getMe)

// PROTECTED WITH BASIC STRATEGY
router.use(passport.authenticate('basic', { session: false }))
router.route('/login')
  .post(passport.authenticate('basic', { session: false }), login)

module.exports = router