import express from 'express'
import { router } from './routes/router.js'
import logger from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Main function of the app.
 */
const main = async () => {
  const app = express()

  app.use(express.json())
  // morgan
  app.use(logger('dev'))

  // load routes
  app.use('/', router)

  app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`)
  })
}

main().catch(console.error)
