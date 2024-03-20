import { createTransport } from "nodemailer";
import { configObject } from "../config/config.js";

const transport = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: configObject.gmail_user_app,
    pass: configObject.gmail_pass_app,
  },
});

export function sendPasswordResetEmail(email, token) {
  return new Promise((resolve, reject) => {
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 1);

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You have requested a password reset. Click the following link to reset your password:</p>
             <a href="http://yourwebsite.com/reset-password?token=${token}">Reset Password</a>`,
      text: `This link is valid until ${expiryTime.toISOString()}`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info.response);
      }
    });
  });
}

export async function sendConfirmationMail() {
  return await transport.sendMail({
    from: "Enviado por <sant.feas@gmail.com>",
    to: user?.email,
    subject: "Confirmacion de compra",
    html: "<div><h1>Gracias por su compra!</h1></div>",
  });
}
