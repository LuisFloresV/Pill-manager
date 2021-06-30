require('dotenv').config()
const app = require('./app')
const { mongoDb } = require('./utils/mongo')
const PORT = process.env.PORT

mongoDb.then(() => console.log('Connect to DB'))


app.listen(PORT, () => { console.log(`App listening on port: ${PORT}`) })