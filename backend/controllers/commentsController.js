import catchAsync from '../utils/catchAsync.js'
import Comment from '../models/commentModel.js'
import AppError from '../utils/AppError.js'

export const createComment = catchAsync(async (req, res, next) => {
  const data = req.body

  if (data.comment.trim() === '') {
    return next(new AppError('Comment can not be empty!', 401))
  }

  const userId = req.user
  data.user = userId

  const newComment = Comment.create(data)
  res.status(201).json({
    status: 'success',
    message: 'Thanks for your comment !👻',
  })
})

export const getComment = catchAsync(async (req, res) => {
  const getCommentById = await Comment.findById(req.params.id).populate('user')
  console.log(getCommentById)
})
