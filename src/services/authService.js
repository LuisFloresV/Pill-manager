const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { success } = require('../utils/response')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/mail')

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
  const options = {
    email,
    subject: 'Welcome to the Pill Manager App!',
    message: " We're glad to have you here at the Pill Manager App. Feel free to use our app and give us feedback!",
  }
  await sendMail(options)
  success(res, 201, { email, token })
})

exports.deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false })
  if (!user || user.active === 'false') return next(new AppError("User doesn't exists", 404))
  const options = {
    email: user.email,
    subject: "You've deactivated your Pill Manager App account 😭",
    message: "This is not a goodbye. We hope you comeback soon. Feel free and give us feedback! 😸",
  }
  await sendMail(options)
  success(res, 204)
})