/**
 * Mongoose model for Users.
 *
 * @author ph222ue (Patrik Hasselblad).
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favourites: {
    type: Array
  }
}, {
  timestamps: true,
  versionKey: false
})

// Create a model using the schema.
export const User = mongoose.model('User', schema)
