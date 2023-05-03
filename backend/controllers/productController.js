import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'
import Product from '../models/productModel.js'
import APIFeatures from '../utils/ApiFeatures.js'

export const createProduct = catchAsync(async (req, res, next) => {
  if (req.user.isAdmin !== 'admin')
    return next(new AppError('only admin can create new product', 400))

  const imagePath = req.files
  let data = JSON.parse(req.body.json)
  data.image = imagePath

  const newProduct = await Product.create(data)

  res.status(201).json({
    status: 'success',
    message: 'Product created',
    newProduct,
  })
})

export const getProducts = catchAsync(async (req, res, next) => {
  const count = await Product.countDocuments()
  const features = new APIFeatures(Product.find(), {
    ...req.query,
    limit: 6,
  })
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const products = await features.query

  res.status(200).json({
    status: 'success',
    results: products.length,
    count,
    data: products,
  })
})

export const getProduct = catchAsync(async (req, res, next) => {
  const { slug } = req.params

  const product = await Product.find({ slug: slug }).populate('review')

  res.status(200).json({
    status: 'success',
    data: product,
  })
})
