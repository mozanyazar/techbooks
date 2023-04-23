import express from 'express'
import { createComment, getComment } from '../controllers/commentsController.js'
import { protect } from '../controllers/protect.js'

const router = express.Router()

router.route('/').post(protect, createComment)
router.route('/:id').get(getComment)

export default router
