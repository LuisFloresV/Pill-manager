const express = require('express')
const router = express.Router()
const { registerUser } = require('../services/userService')

router.route('/register')
  .post(registerUser)


module.exports = router