const welcomeHtml = (user, link) => {
    const string = `
    <div style="background-color: #f8f8f8; padding: 20px;">
      <h1 style="color: #444;">¡Bienvenido a Vitality Medical Group, ${user.full_name}!</h1>
      <p style="font-size: 16px;">Gracias por registrarte en nuestra clinica. Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
      <p style="font-size: 16px;">Dale click al siguiente link para que conozcas nuestro planes:</p>
      <a href=${link}>Planes que cuidan tu vida</a>
      <p style="font-size: 16px;">¡Gracias de nuevo por unirte a nosotros! Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros enviando un email.</p>
      <p style="font-size: 16px;">Saludos cordiales,</p>
      <p style="font-size: 16px;">El equipo de Vitality Medical Group</p>
    </div>
    `

    return string;
}

module.exports = welcomeHtml;