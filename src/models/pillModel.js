const mongoose = require('mongoose')

const pillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the medicine must be specified'],
    trim: true,
    minLength: [5, 'A medicine name must have at least 5 characters'],
    maxLength: [25, 'A medicine name must have less or equal than 25 characters']
  },
  slug: String,
  dose: {
    type: Number,
    required: [true, 'Dose of the medicine must be specified'],
    trim: true,
    min: [1, 'Dose must be above 1 pill'],
    max: [10, 'Dose must be below 11 pills']
  },
  frequency: {
    type: String,
    required: [true, 'Frequency of the medicine must be specified'],
    enum: {
      values: ['4 hours', '6 hours', '8 hours', '12 hours', '24 hours'],
      message: 'Frequency is expressed in hours: 4 6 8 12 24 hours'
    }
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An user needs to register a new medicine!']
  }
})

const Pill = mongoose.model('Pill', pillSchema)

module.exports = Pill