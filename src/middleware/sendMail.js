const nodemailer = require('nodemailer')
const { configObject } = require ('../config/config.js')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user_app,
        pass: configObject.gmail_pass_app
    }
})

exports.sendMail = async () => {
    return await transport.sendMail({
        from: 'Enviado por <sant.feas@gmail.com>',
        to: destino,
        subject:'',
        html: '<div><h1>Email de prueba</h1></div>'
    })
}