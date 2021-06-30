const Pill = require('../models/pillModel')
const { success } = require('../utils/response')

exports.getPills = async (req, res, next) => {
  const data = await Pill.find()
  success(res, 200, data)
}

exports.postPill = async (req, res, next) => {
  const data = await Pill.create(req.body)
  success(res, 201, data)
}

exports.deletePills = async (req, res, next) => {
  const data = await Pill.deleteMany({})
  success(res, 204, data)
}

exports.getPill = async (req, res, next) => {
  const data = await Pill.findById(req.params.id)
  success(res, 200, data)
}

exports.deletePill = async (req, res, next) => {
  const data = await Pill.deleteOne({ _id: req.params.id })
  success(res, 204, data)
}

exports.patchPill = async (req, res, next) => {
  const data = await Pill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!data) { return console.log('No document with that id') }
  success(res, 200, data)
}