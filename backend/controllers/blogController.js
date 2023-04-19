import Blog from '../models/blogModel.js'
import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const createBlog = catchAsync(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  const imageFile = req.files.image
  const randomName = uuidv4()

  const uploadPath = path.join(
    __dirname,
    '../uploads/images',
    `${randomName}-${imageFile.name}`
  )

  const pathname = `${path.basename(uploadPath)}`

  imageFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ message: err })
    }
  })

  let data = JSON.parse(req.body.json)
  data.image = pathname

  const blog = await Blog.create(data)
  res.status(200).json({
    status: 'success',
    message: 'The blog has been successfully saved.',
  })
})

export const getBlogs = catchAsync(async (req, res) => {
  const category = req.query.category
  console.log(req.body)
  console.log(req.query)
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
