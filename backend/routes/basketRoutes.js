import express from 'express'
import { protect } from '../controllers/protect.js'
import {
  updateBasket,
  getBasket,
  deleteItem,
} from '../controllers/basketController.js'

const router = express.Router()

router
  .route('/')
  .patch(protect, updateBasket)
  .get(protect, getBasket)
  .delete(protect, deleteItem)

export default router
