import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config({ path: './.env' })
const port = process.env.PORT || 3000

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log(`connected to db `))
  .catch((e) => console.log(e))

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`)
})
