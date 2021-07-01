
const app = require('./app')

const PORT = process.env.PORT
const sendReminder = require('./utils/mail24')



// CRON JOB TO SEND PRESCRIPTIONS VIA EMAIL
// sendReminder()

app.listen(PORT, () => { console.log(`App listening on port: ${PORT}`) })