const AppError = require('../utils/appError')
const { fail, operational, unexpected } = require('../utils/response')

const sendErrorProd = (err, res) => {
  // Trusted Error
  if (err.isOperational) return operational(res, err)
  // Unexpected Error
  console.error('ERROR', err)
  unexpected(res)
}

const handleValidationError = (err) => {
  console.log(err.message)
  const message = `Invalid input data. ${err.message}`
  return new AppError(message, 400)
}

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const handleDuplicateError = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name} Please use another value!`
  return new AppError(message, 400)
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (process.env.NODE_ENV === 'development') return fail(res, err)
  // Production Error
  let error = Object.create(err)
  if (error.name === 'ValidationError') error = handleValidationError(error)
  if (error.name === 'CastError') error = handleCastError(error)
  if (error.code === 11000) error = handleDuplicateError(error)

  sendErrorProd(error, res)
}
