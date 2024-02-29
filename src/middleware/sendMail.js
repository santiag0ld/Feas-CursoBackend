import { createTransport } from "nodemailer";
import { configObject } from "../config/config.js";
import { userInfo } from "os";

const transport = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: configObject.gmail_user_app,
    pass: configObject.gmail_pass_app,
  },
});

export async function sendMail() {
  return await transport.sendMail({
    from: "Enviado por <sant.feas@gmail.com>",
    to: user?.email,
    subject: "Confirmacion de compra",
    html: "<div><h1>Gracias por su compra!</h1></div>",
  });
}
