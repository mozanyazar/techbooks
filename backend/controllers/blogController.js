import Blog from '../models/blogModel.js'
import APIFeatures from '../utils/ApiFeatures.js'
import catchAsync from '../utils/catchAsync.js'

export const createBlog = catchAsync(async (req, res) => {
  const imagePath = req.files
  let data = JSON.parse(req.body.json)
  data.image = imagePath
  data.user = req.user

  const blog = await Blog.create(data)
  res.status(200).json({
    status: 'success',
    message: 'The blog has been successfully saved.',
  })
})

export const getBlogs = catchAsync(async (req, res) => {
  // get how many document we have this is for pagination
  const count = await Blog.countDocuments()

  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const blog = await features.query
  res.status(200).json({
    status: 'success',
    results: blog.length,
    count,
    data: blog,
  })
})

export const getBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id }).populate('comments')
  res.status(200).json({
    status: 'success',
    data: blog,
  })
})
