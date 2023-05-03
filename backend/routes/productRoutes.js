import express from 'express'
import {
  createProduct,
  getProduct,
  getProducts,
} from '../controllers/productController.js'
import { protect } from '../controllers/protect.js'
import { imageUpload } from '../middleware/imageUpload.js'

const router = express.Router()

router.route('/').post(protect, imageUpload, createProduct).get(getProducts)
router.route('/:slug').get(getProduct)

export default router
