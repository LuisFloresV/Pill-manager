const mongoose = require('mongoose')
const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_NAME : process.env.DB_NAME
exports.mongoDb = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oz3qb.mongodb.net/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})