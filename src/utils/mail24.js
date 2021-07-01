// SEND REMINDER EVERY 24 HOURS TO TAKE PILLS
const cron = require('node-cron');
const User = require('../models/userModel')
const Pill = require('../models/pillModel')
const sendMail = require('../utils/mail')

const generatePrescription = (prescription) => {
  let message = ''
  for (let x = 0; x < prescription.length; x++) {
    message += `Name:${prescription[x].name} Dose: ${prescription[x].dose} Every ${prescription[x].frequency} \n`
  }
  return message
}

const optionsMail = (prescription, email) => {
  const options = {
    email: email,
    subject: "Here's your daily reminder 😎",
    message: `Don't forget to take your medication today. ${prescription}`
  }
  return options
}

// SEND EMAIL AT 24:00 
const sendReminder = async () => {
  cron.schedule('0 0 * * *', async function () {
    const users = await User.find()
    users.forEach(async (el) => {
      if (el.active === true) {
        const pills = await Pill.find({ owner: el._id })
        if (pills.length > 0) {
          const prescription = pills.map(el => el)
          const message = generatePrescription(prescription)
          const options = optionsMail(message, el.email)
          console.log(options)
          sendMail(options)
        }
      }
    })
  },
    {
      scheduled: true,
      timezone: "UTC-5"
    }
  )
}

module.exports = sendReminder