const mongoose = require('mongoose')

exports.mongoDb = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oz3qb.mongodb.net/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})