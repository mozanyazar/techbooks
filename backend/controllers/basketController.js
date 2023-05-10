import Basket from '../models/basketModel.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

export const updateBasket = catchAsync(async (req, res, next) => {
  const userId = req.user
  const items = req.body
  const basket = await Basket.findOne({ userId: userId })

  const existingItem = basket.items.find((item) => item.title === items.title)
  if (existingItem) {
    existingItem.quantity += items.quantity || 1
  } else {
    basket.items.push(items)
  }

  await basket.save()

  return res.status(200).json({
    status: 'success',
    data: basket,
  })
})

export const getBasket = catchAsync(async (req, res, next) => {
  const userId = req.user

  const basket = await Basket.findOne({ userId: userId })

  res.status(200).json({
    status: 'success',
    data: basket,
  })
})

export const deleteItem = catchAsync(async (req, res, next) => {
  const userId = req.user
  const { title } = req.body

  const basket = await Basket.findOne({ userId: userId })
  basket.items = basket.items.filter((item) => item.title !== title)

  await basket.save()

  res.status(200).json({
    status: 'success',
    data: basket,
    message: 'Basket item has been deleted.',
  })
})
