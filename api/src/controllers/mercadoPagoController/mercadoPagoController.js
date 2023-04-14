const mercadopago = require("mercadopago");
const { PROD_ACCESS_TOKEN } = process.env;

// Configuramos el token de acceso de MercadoPago
mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN,
});

// Configuramos una ruta POST para crear una preferencia de pago en MercadoPago
const createPago = async (
  id,
  title,
  description,
  picture_url,
  quantity,
  currency_id,
  unit_price
) => {
  console.log("pase por el controller");
  console.log(title, unit_price, quantity);
  // Creamos la preferencia con los datos recibidos en el cuerpo de la solicitud POST
  let preference = {
    items: [
      {
        id: id,
        title: title,
        description: description,
        picture_url: picture_url,
        currency_id: "ARS",
        unit_price: unit_price,
        quantity: quantity,
      },
    ],
    back_urls: {
      success: "http://127.0.0.1:5173/",
      failure: "",
      pending: "",
    },
    // auto es para que si se aprueva el pago te diriga a la pagina asignada arriba
    // binary mode es para cancelar otros tipos de pago, solo aceptar tarjeta de credito
    auto_return: "approved",
    binary_mode: true,
  };

  const result = await mercadopago.preferences.create(preference);
  // Enviamos la preferencia a MercadoPago y devolvemos su ID en la respuesta JSON
  return {
    mpresult: result,
    global: id,
  };
};

module.exports = {
  createPago,
};
