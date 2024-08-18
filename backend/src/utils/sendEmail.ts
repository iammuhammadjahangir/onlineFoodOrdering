import nodeMailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  resetPasswordUrl: string;
}

export const sendEmail = async (options: EmailOptions) => {
  // Define the email content
  const emailContent = `
    <p>Hello,</p>
    <p>Please click the following link to reset your password:</p>
    ${options.resetPasswordUrl}
    <p>Thank you!</p>
    `;

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
    // text: options.message,
    html: emailContent,
  };

  transport.sendMail(mailOptions);
};
