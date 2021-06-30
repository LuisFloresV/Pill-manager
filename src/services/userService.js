const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { success } = require('../utils/response')
const jwt = require('jsonwebtoken')

exports.registerUser = catchAsync(async (req, res, next) => {
  const { _id, email } = await User.create(req.body)
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  success(res, 201, { email, token })
})