import AppError from '../utils/AppError.js'

const handleDuplicateFieldsDB = (error) => {
  console.log(error)
  const message =
    'Girilen bilgilerin başka kullanıcılar tarafından kullanılmaması gerekmektedir'
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

  sendErrorProd(err, res)
}

export default errorHandler
