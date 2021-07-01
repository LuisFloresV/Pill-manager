const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { success } = require('../utils/response')

exports.getMe = catchAsync(async (req, res, next) => {
  success(res, 200, req.user)
})

exports.deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false })
  if (!user || user.active === 'false') return next(new AppError("User doesn't exists", 404))
  success(res, 204)
})