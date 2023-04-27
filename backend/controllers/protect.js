import util from 'util'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

export const protect = catchAsync(async (req, res, next) => {
  const cookieString = req.headers.cookie
  if (!cookieString) {
    return new AppError('You have to login', 404)
  }

  const token = cookieString.split('=')[1]

  const verifyAsync = util.promisify(jwt.verify)
  const verifiedJWT = await verifyAsync(token, process.env.JWT_SECRET)
  const currentUser = await User.findById(verifiedJWT.id).select('-__v')

  if (!currentUser) {
    // clear the cookie
    res.clearCookie('jwt')
    return next(
      new AppError('the user belonging to this token does no longer exist', 401)
    )
  }
  req.user = currentUser._id
  req.user.isAdmin = currentUser.role
  next()
})
