import express from 'express'
import { createBlog, getBlog, getBlogs } from '../controllers/blogController.js'

import { protect } from '../controllers/protect.js'

const router = express.Router()

router.route('/').post(protect, createBlog).get(getBlogs)
router.route('/:id').get(getBlog)

export default router
