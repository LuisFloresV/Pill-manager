require('dotenv').config()
const express = require('express')
const app = express()
const pillRouter = require('./router/pillRouter')
const userRouter = require('./router/userRouter')
const errorHandler = require('./utils/errorHandler')
const passport = require('passport')
const { error404 } = require('./middleware/404')

const { mongoDb } = require('./utils/mongo')
mongoDb.then(() => console.log('Connect to DB'))
// JSON PARSER
app.use(express.json())

// PASSPORT INIT
app.use(passport.initialize())

// ROUTES
app.use('/api/v1/pills', pillRouter)
app.use('/api/v1/users', userRouter)

// 404 HANDLER
app.use('*', error404)

// ERROR HANDLER
app.use(errorHandler)

module.exports = app