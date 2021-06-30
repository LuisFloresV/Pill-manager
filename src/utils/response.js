exports.success = (res, code, data) => {
  res.status(code).json({
    status: 'success',
    data
  })
}

exports.fail = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}


exports.operational = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}

exports.unexpected = (res) => {
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong :(',
  })
}