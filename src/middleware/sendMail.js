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

export async function sendMail() {
  return await transport.sendMail({
    from: "Enviado por <sant.feas@gmail.com>",
    to: destino,
    subject: "",
    html: "<div><h1>Email de prueba</h1></div>",
  });
}
