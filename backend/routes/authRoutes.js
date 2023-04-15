import express from 'express'
import {
  createUser,
  compareTokenAndUserId,
  logOut,
  logIn,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

const router = express.Router()

router.route('/signup').post(createUser)
router.route('/verifyToken').post(compareTokenAndUserId)
router.route('/logout').post(logOut)
router.route('/logIn').post(logIn)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

export default router
