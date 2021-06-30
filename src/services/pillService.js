const Pill = require('../models/pillModel')
const { success } = require('../utils/response')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getPills = catchAsync(async (req, res, next) => {
  const data = await Pill.find()
  if (data.length === 0) return next(new AppError('There is no data yet!', 404))
  success(res, 200, data)
})

exports.postPill = catchAsync(async (req, res, next) => {
  const data = await Pill.create(req.body)
  success(res, 201, data)
})

exports.deletePills = catchAsync(async (req, res, next) => {
  const data = await Pill.deleteMany({})
  success(res, 204, data)
})

exports.getPill = catchAsync(async (req, res, next) => {
  const data = await Pill.findById(req.params.id)
  if (!data) return next(new AppError('No medicine with that ID', 404))
  success(res, 200, data)
})

exports.deletePill = catchAsync(async (req, res, next) => {
  const data = await Pill.findByIdAndDelete( req.params.id)
  if (!data) return next(new AppError('No medicine with that ID', 404))
  success(res, 204, data)
})

exports.patchPill = catchAsync(async (req, res, next) => {
  const data = await Pill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!data) return next(new AppError('No medicine with that ID', 404))
  success(res, 200, data)
})