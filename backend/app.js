import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import xss from 'xss-clean'

// routes
// import errorHandler from './controllers/errorController.js'
import authRouter from './routes/authRoutes.js'
import errorHandler from './controllers/errorController.js'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cookieParser())
app.use(helmet())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
})

app.use('/api', limiter)
app.use(express.json({ limit: '100kb' }))
app.use(mongoSanitize())
app.use(xss())
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
)

app.use('/api/v1/users', authRouter)

app.use(errorHandler)


export default app

