const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { success } = require('../utils/response')
const jwt = require('jsonwebtoken')

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.login = catchAsync(async (req, res, next) => {
  const token = generateJWT(req.user._id)
  success(res, 201, token)
})

exports.registerUser = catchAsync(async (req, res, next) => {
  const { _id, email } = await User.create(req.body)
  const token = generateJWT(_id)
  success(res, 201, { email, token })
})