const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'An email must be provided to register a new user'],
    trim: true,
    unique: true,
    validate: [validator.isEmail, 'Valid email must be provided!']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password must be at least 8 characters'],
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 8)
  next()
})

userSchema.methods.validCredentials = async function (candidate) {
  const eval = await bcrypt.compare(this.password, candidate)
  return eval
}

const User = mongoose.model('User', userSchema)

module.exports = User