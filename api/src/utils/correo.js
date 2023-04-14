const nodemailer = require("nodemailer");
const { auth } = require("./googleConfig.js")
const dotenv = require("dotenv");
dotenv.config();

const { EMAIL } = process.env;

const welcomeHtml = require("./plantillasHtml/bienvenido.js")


const options = {
    from: EMAIL,
    to: "",
    subject: "",
    text: "",
    html: ""
  };


  const resetOptions = () => {
    options.to = ""
    options.subject = ""
    options.text = ""
    options.html = ""
}

const createTransport = () => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: auth
    })
    return transport;
}


const sendMail = async (mailOptions) => {
    try {        
        const transport = createTransport();
        await transport.sendMail(mailOptions);
        resetOptions();
        return "Correo enviado con exito"
    } catch (error) {
        return error.message
    }
}


const mailWelcome = async(user, link) => {
    options.to = user.email;
    options.subject = "Bienvenido";
    options.text = ""
    options.html = welcomeHtml(user, link)
    const res = await sendMail(options);
    return res;
}


const mailResetPass = async(email, pass) => {
    options.to = email;
    options.subject = "Reset password";
    options.text = "Please, reset su password"
    options.html = `<b>Your temporary password is ${pass}</b>`
    const res = sendMail(options);
    return res;
}

const mailConfirmedTicketMedical = async (email, ticket) => {
    options.to = email;
    options.subject = "Ticket Medical confirmed";
    options.text = "Reservation confirmed"
    options.html = `<div>
                        <b>Your reservation is</b>
                        <p>Name: ${ticket.name}</p>
                        <p>Fecha: ${ticket.date}</p>
                        <p>Hora inicio: ${ticket.hour_start}</p>
                        <p>Doctor: ${ticket.doctor}</p>
                        <p>Speciality: ${ticket.speciality}</p>
                    </div>`
    const res = await sendMail(options);
    resetOptions();
    return res;

}
const mailConfirmedTicketAnalysis = async (email, ticket) => {
    options.to = email;
    options.subject = "Ticket Analysis confirmed";
    options.text = "Reservation confirmed"
    options.html = `<div>
                        <b>Your reservation is</b>
                        <p>Name: ${ticket.name}</p>
                        <p>Fecha: ${ticket.date}</p>
                        <p>Hora: ${ticket.hour}</p>
                        <p>Doctor: ${ticket.doctor}</p>
                        <p>Speciality: ${ticket.speciality}</p>
                        <p>Analisis: ${ticket.type_analysis}</p>
                    </div>`
    const res = await sendMail(options);
    resetOptions();
    return res;

}

module.exports = {
    mailWelcome,
    mailResetPass,
    mailConfirmedTicketMedical,
    mailConfirmedTicketAnalysis,
}
