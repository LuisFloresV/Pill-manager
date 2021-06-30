const { success } = require('../utils/response')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAll = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.find()
  if (data.length === 0) return next(new AppError('There is no data yet!', 404))
  success(res, 200, data)
})

exports.createOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.create(req.body)
  success(res, 201, data)
})

exports.getOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.findById(req.params.id)
  if (!data) return next(new AppError('No document with that ID', 404))
  success(res, 200, data)
})

exports.deleteOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.findByIdAndDelete(req.params.id)
  if (!data) return next(new AppError('No document with that ID', 404))
  success(res, 204, data)
})

exports.patchOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!data) return next(new AppError('No document with that ID', 404))
  success(res, 200, data)
})