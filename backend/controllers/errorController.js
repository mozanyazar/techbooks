import AppError from '../utils/AppError.js'

const handleDuplicateFieldsDB = (error) => {
  const startIndex = error.message.indexOf('{')
  const endIndex = error.message.indexOf('}')
  const duplicateKey = error.message.slice(startIndex, endIndex + 1)
  const message = `This field must be a unique = ${duplicateKey}`

  return new AppError(message, 400)
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }
  res.status(500).json({
    status: 'error',
    message: err.message,
  })
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  if (err.code === 11000) error = handleDuplicateFieldsDB(err)

  sendErrorProd(error, res)
}

export default errorHandler
