const mercadopago = require("mercadopago");
const axios = require("axios");
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
      success:
        "https://vitality-medical-group.vercel.app/checkout/feedback",
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

// const getPago = async (id) => {
//    console.log('controller');
//    console.log(id);
//    const result = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`,{
//     headers:{
//        Authorization: `Bearer ${PROD_ACCESS_TOKEN}`
//      }
//    } )
//    return result
//  }

// const getPago = async (id) => {
//   const payment_id = 'ID_DEL_PAGO_A_CONSULTAR';
//   try {
//     const payment = await mercadopago.payment.findById(id);
//     console.log(payment);
//     // Si el estado del pago es "approved" (aprobado), significa que el usuario ha realizado el pago correctamente
//     if (payment.response.status === 'approved') {
//       console.log('El pago ha sido aprobado');
//     } else {
//       console.log('El pago aún no ha sido aprobado');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// // para recibir la info del pago
// const getPago = async (req, res, next) => {
//   try{
//   const userId = req.params.id
//   const payment_id = req.query["data.id"]
//   const payment_switch = req.query.type
//   if(payment_switch === "payment") {
//     const payment = await mercadopago.payment.findById(payment_id);
//     /* const paymentModel = await Payment.create({info : payment.body}) */
//     if(payment.response.status === "approved"){
//       try{
//       let order_info = await generateOrder(userId)
//       order_info = await approveOrder(order_info.id)
//     /* order_info.paymentId = paymentModel.id */
//       sendMail(userId, order_info.id)
//       res.status(200).send({Order: order_info})
//       }
//       catch (error) {res.status(500).send({message: error.message})}
//     }
//     else if (payment.response.status === "rejected") {
//     try{
//       let order_info = await generateOrder(userId)
//     order_info = await rejectOrder(order_info.id)
//     res.status(200).send({Order: order_info})
//     }
//     catch (error) {res.status(500).send({message: error.message})}
//     }
//   }
//   res.status(200).send()
// }
// catch (error) {res.status(500).send({message: error.message})}
// }

// ACA EMPIEZA EL CODIGO DE BERNA V1

const mapObject = (obj, id) => {
  const map = {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    picture_url: obj.picture_url,
    quantity: obj.quantity,
    unit_price: obj.price,
    currency_id: id,
  };
  return map;
};

const createPago_V2 = async (plan, medical, analisys) => {
  const currency_id = "ARS";
  const preference = {
    items: [],
    back_urls: {
      success:
        "https://vitality-medical-group.vercel.app/checkout/feedback",
      failure: "",
      pending: "",
    },
  };
  if (plan) {
    plan.map((p) => {
      preference.items.push(mapObject(p, currency_id));
    });
  }

  if (medical) {
    medical.map((m) => {
      preference.items.push(mapObject(m, currency_id));
    });
  }

  if (analisys) {
    analisys.map((a) => {
      preference.items.push(mapObject(a, currency_id));
    });
  }

  const result = await mercadopago.preferences.create(preference);
  // Enviamos la preferencia a MercadoPago y devolvemos su ID en la respuesta JSON
  return {
    mpresult: result,
    global: { init_point: result.body.init_point },
  };
};

//   ACA TERMINA EL CODIGO DE VERNA V2

module.exports = {
  createPago,
  createPago_V2,
};
