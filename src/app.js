const express = require('express')
const app = express()
const pillRouter = require('./router/pillRouter')
const errorHandler = require('./utils/errorHandler')
app.use(express.json())


app.use('/api/v1/pills', pillRouter)

app.use(errorHandler)

module.exports = app