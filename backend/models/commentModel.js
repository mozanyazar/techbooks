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
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
