exports.success = (res, code, data) => {
  res.status(code).json({
    status: 'success',
    data
  })
}