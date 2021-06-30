const express = require('express')
const app = express()
const pillRouter = require('./router/pillRouter')
app.use(express.json())

app.use('/api/v1/pills', pillRouter)

module.exports = app