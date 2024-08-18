const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = nodeMailer.createTransport({
    // host: "smtp.gmail.com", //un cmment these 2 lines if mail not send even after success (use these 2 in env variables for simplification)
    // port : 465,
    service: process.env.SMTP_SERVICE, //simple mail transfer protocol(SMTP)
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transport.sendMail(mailOptions);
};

module.exports = sendEmail;
