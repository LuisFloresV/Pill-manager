require('dotenv').config()
const app = require('./app')
const { mongoDb } = require('./utils/mongo')
const PORT = process.env.PORT
const sendReminder = require('./utils/mail24')

mongoDb.then(() => console.log('Connect to DB'))

// CRON JOB TO SEND PRESCRIPTIONS VIA EMAIL
// sendReminder()

app.listen(PORT, () => { console.log(`App listening on port: ${PORT}`) })