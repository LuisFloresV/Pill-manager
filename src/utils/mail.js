// SEND WELCOME AND DEACTIVATION EMAILS
const nodemailer = require('nodemailer')

const sendMail = async (options, type) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  // send mail with defined transport object
  const mailOptions = {
    from: 'Naoko <naokodeveloper@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  }

  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent: %s", info.messageId);
}


module.exports = sendMail