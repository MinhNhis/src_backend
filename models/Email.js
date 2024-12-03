const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'minhnhidmn0502@gmail.com',
    pass: 'wpglckyqsavqgaws'
  }
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'nguyenpro2486@gmail.com',
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };