import express from 'express'
import { createReview, getReview } from '../controllers/reviewController.js'
import { protect } from '../controllers/protect.js'

const router = express.Router()

router.route('/').post(protect, createReview)
router.route('/:id').get(getReview)
export default router
