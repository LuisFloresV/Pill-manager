const AppError = require('../utils/appError')

exports.error404 = (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`, 404))
}