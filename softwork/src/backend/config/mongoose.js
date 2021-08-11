/**
 * Mongoose configuration.
 *
 * @author ph222ue (Patrik Hasselblad)
 * @version 1.0.0
 */

import mongoose from 'mongoose'

export const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
  mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Drop the database.
  // mongoose.connect(process.env.DB_CONNECTION_STRING, function () {
  //   mongoose.connection.dropDatabase()
  // })

  // Connect to the server.
  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
