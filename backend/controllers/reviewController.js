import catchAsync from '../utils/catchAsync.js'
import Review from '../models/reviewModel.js'
import AppError from '../utils/AppError.js'

export const createReview = async (req, res, next) => {
  const user = req.user
  const review = req.body
  review.user = user
  const checkUserReviews = await Review.findOne({
    user: req.user,
    product: req.body.product,
  })
  if (checkUserReviews) {
    return res.status(409).json({
      status: 'fail',
      message: 'You already did a comment for this product!',
    })
  }

  const newReview = await Review.create(review)
  res.status(201).json({
    status: 'success',
    data: newReview,
  })
}

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  res.status(200).json({
    status: 'success',
    data: review,
  })
})
