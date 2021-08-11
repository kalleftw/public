import express from 'express'
import session from 'express-session'
import http from 'http'
import helmet from 'helmet'
import dotenv from 'dotenv'

import {
  router
} from './routes/router.js'
import {
  connectDB
} from './config/mongoose.js'

const main = async () => {
  dotenv.config()
  await connectDB()

  const app = express()
  const server = http.createServer(app)

  app.use(express.json())
  app.use(express.urlencoded({
    extended: false
  }))

  // Helmet
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net']
      }
    })
  )

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:8080`)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type-Accept')
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  // Session options
  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: false,
      sameSite: 'lax'
    }
  }

  app.use(session(sessionOptions))

  app.use(function (req, res, next) {
    res.locals.user = req.session.user
    next()
  })

  app.use('/', router)

  server.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
