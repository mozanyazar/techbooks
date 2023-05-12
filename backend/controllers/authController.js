import crypto from 'crypto'
import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import util from 'util'
import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js'
import nodemailer from 'nodemailer'
import Basket from '../models/basketModel.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true
    cookieOptions.sameSite = 'none'
    // cookieOptions.domain = '.techbooks.vercel.app'
  }
  // remove the password
  user.password = undefined
  res.cookie('jwt', token, cookieOptions)
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

export const createUser = catchAsync(async (req, res) => {
  const imagePath = req.files
  const body = JSON.parse(req.body.json)
  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
    passwordConfirm: body.passwordConfirm,
    photo: imagePath,
  })

  await Basket.create({ userId: newUser._id })
  createAndSendToken(newUser, 201, res)
})

export const compareTokenAndUserId = catchAsync(async (req, res, next) => {
  let cookieString = req.headers.cookie
  if (!cookieString) return res.send({ status: 'fail' })

  // get jsonwebtoken from req.headers
  const jwtCookie = cookieString
    .split('; ')
    .find((cookie) => cookie.startsWith('jwt='))

  const token = jwtCookie ? jwtCookie.split('=')[1] : null

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
  res.status(200).json({
    status: 'success',
    currentUser,
  })
})

// clear jwt from cookie
export const logOut = (req, res) => {
  // res.cookie('jwt', '', { maxAge: 1 })
  // res.clearCookie('jwt')
  res.clearCookie('jwt', {
    path: '/',
    domain: '.techbooks-production.up.railway.app',
  })

  res.status(200).json({ message: 'success' })
}

export const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Email ve şifreyi giriniz', 400))
  }

  const user = await User.findOne({ email: email }).select('+password -__v')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Email veya şifre hatalı!', 401))
  }

  createAndSendToken(user, 200, res)
})

// send link when user forgot the password
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body

  const user = await User.findOne({ email: email })
  if (user === null) {
    return next(
      new AppError(
        'Please make sure you have entered your email address correctly',
        404
      )
    )
  }

  const resetToken = await user.createPasswordResetToken()

  await user.save({ validateBeforeSave: false })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testdenemenodejs@gmail.com',
      pass: 'dbmrkjjcfnixxsdj',
    },
  })

  const mailOptions = {
    from: 'testdenemenodejs@gmail.com',
    to: `${email}`,
    subject: 'Şifre Sıfırlama İsteği',
    html: `<p style="color:red;">Merhaba,</p>
    <p>Şifrenizi sıfırlama talebinde bulundunuz. Buraya tıklayınız <a href="http://localhost:3000/reset_password/${resetToken}">buraya tıklayın</a></p>
    <p>Teşekkür ederiz.</p>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Check your email, Password reset link sent',
      })
    }
  })
}

// password reset
export const resetPassword = catchAsync(async (req, res) => {
  const { token, password, passwordConfirm } = req.body

  // get user based on the token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400))
  }

  user.password = password
  user.passwordConfirm = passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  // update changedpasswordAt property for the user
  await user.save()

  // log the user in send jwt
  createAndSendToken(user, 200, res)
})
