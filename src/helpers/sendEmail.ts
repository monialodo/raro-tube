import * as nodemailer from 'nodemailer';
import { emailOptions } from '../@types/helpers/EmailOptions';
import { signupTemplate } from '../public/emails/signupTemplate';
// UNCOMMENT THIS TO TEST WITHOUT RUNNING THE APP
// import 'dotenv/config';

export async function sendEmail(email: string, options: emailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRANSPORT_HOST,
    port: Number(process.env.MAIL_TRANSPORT_PORT),
    auth: {
      user: process.env.MAIL_TRANSPORT_USER,
      pass: process.env.MAIL_TRANSPORT_PASS,
    }
  });

  const mailOptions = {
    ...options,
    from: process.env.MAIL_OPTION_FROM,
    to: email,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('ERROR:', error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

}

// UNCOMMENT THIS TO TEST WITHOUT RUNNING THE APP
// sendEmail('example@gmail.com', {
//   subject: 'example subject',
//   html: signupTemplate('J67SADF7E3H34U'),
// })
