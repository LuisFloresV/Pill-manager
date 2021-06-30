const Pill = require('../models/pillModel')
const { success } = require('../utils/response')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.deletePills = catchAsync(async (req, res, next) => {
  const data = await Pill.deleteMany({})
  success(res, 204, data)
})
