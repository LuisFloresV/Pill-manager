const { success } = require('../utils/response')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAll = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.find({ owner: req.user._id })
  if (data.length === 0) return next(new AppError('There is no data yet!', 404))
  success(res, 200, data)
})

exports.createOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.create({ ...req.body, owner: req.user._id })
  success(res, 201, data)
})

exports.getOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.findOne({ _id: req.params.id, owner: req.user._id })
  if (!data) return next(new AppError('No document with that ID', 404))
  success(res, 200, data)
})

exports.deleteOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
  if (!data) return next(new AppError('No document with that ID', 404))
  success(res, 204, data)
})

exports.patchOne = (Model) => catchAsync(async (req, res, next) => {
  const data = await Model.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true, runValidators: true })
  if (!data) return next(new AppError('No document with that ID', 404))
  success(res, 200, data)
})