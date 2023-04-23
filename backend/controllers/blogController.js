import Blog from '../models/blogModel.js'
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
  const category = req.query.category
  if (category) {
    const blogs = await Blog.find({ category: category })
    res.status(200).json({
      status: 'success',
      data: blogs,
    })
  } else {
    const blogs = await Blog.find()
    res.status(200).json({
      status: 'success',
      data: blogs,
    })
  }
})

export const getBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id

  const blog = await Blog.findOne({ _id: blogId }).populate('comments')
  res.status(200).json(blog)
})
