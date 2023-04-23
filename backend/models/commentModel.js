import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: true,
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
commentSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  next()
})

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
