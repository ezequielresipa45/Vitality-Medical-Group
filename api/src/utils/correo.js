const nodemailer = require("nodemailer");
const { auth } = require("./googleConfig.js")
const dotenv = require("dotenv");
dotenv.config();

const { EMAIL } = process.env;


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



const mailResetPass = async(email, pass) => {
    options.to = email;
    options.subject = "Reset password";
    options.text = "Please, reset su password"
    options.html = `<b>Your temporary password is ${pass}</b>`
    const res = sendMail(mailOptions);
    return res;
}

const mailConfirmed = async (email, ticket) => {
    options.to = email;
    options.subject = "Ticket confirmed";
    options.text = "Reservation confirmed"
    options.html = `<div>
                        <b>Your reservation is</b>
                        <p>Name: ${ticket.name}</p>
                        <p>Name: ${ticket.fecha}</p>
                        <p>Hora: ${ticket.hora}</p>
                        <p>Doctor: ${ticket.doctor}</p>
                        <p>Speciality: ${ticket.speciality}</p>
                    </div>`
    const res = sendMail(options);
    resetOptions();
    return res;

}

module.exports = {
    mailResetPass,
    mailConfirmed
}
