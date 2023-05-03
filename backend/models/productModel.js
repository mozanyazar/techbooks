import mongoose from 'mongoose'
import slugify from 'slugify'
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      minlength: [3, 'under 3 char'],
    },
    description: {
      type: String,
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
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    pages: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual populate
productSchema.virtual('review', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
})

productSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  next()
})

productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true })
  next()
})

const Product = mongoose.model('Product', productSchema)
export default Product
