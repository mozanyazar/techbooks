import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please tell us your name'],
      minlength: [3, 'under 3 char'],
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['database', 'frontend', 'backend', 'game development'],
    },
    createdAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
blogSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  next()
})
blogSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'blog',
  localField: '_id',
})

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
