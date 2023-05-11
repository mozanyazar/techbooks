import mongoose from 'mongoose'
const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    ratingsAverage: {
      type: Number,
      required: true,
    },
    ratingsQuantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    _id: false,
  }
)

const basketSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: [itemSchema],
      default: [],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
basketSchema.pre('save', function (next) {
  const items = this.items
  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  this.totalPrice = total
  next()
})
// basketSchema.post('findOneAndUpdate', async function (doc) {
//   const items = doc.items
//   const total = items.reduce((acc, item) => {
//     return acc + item.price * item.quantity
//   }, 0)

//   await doc.updateOne({ totalPrice: total })
// })
const Basket = mongoose.model('Basket', basketSchema)
export default Basket
