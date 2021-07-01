const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { success } = require('../utils/response')

exports.getMe = catchAsync(async (req, res, next) => {
  success(res, 200, req.user)
})

