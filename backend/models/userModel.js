import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import validator from 'validator'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    minlength: [3, 'under 3 char'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be more than 6 characters'],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on CREATE AND SAVE !
      validator: function (el) {
        return el === this.password
      },
      message: 'Password does not match!',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
})

// signup hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)
  // delete passwordConfirm field
  this.passwordConfirm = undefined
  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()
  this.passwordChangedAt = Date.now()
  next()
})

// compare the password for 'LOGIN'
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

// forgot the password create a reset token and send a email
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userSchema)
export default User
