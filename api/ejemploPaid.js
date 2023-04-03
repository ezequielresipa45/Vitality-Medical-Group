const payment = {
  id: 20359978,
  date_created: "2019-07-10T14:47:58.000Z",
  date_approved: "2019-07-10T14:47:58.000Z",
  date_last_updated: "2019-07-10T14:47:58.000Z",
  money_release_date: "2019-07-24T14:47:58.000Z",
  issuer_id: 25,
  payment_method_id: "visa",
  payment_type_id: "credit_card",
  status: "approved",
  status_detail: "accredited",
  currency_id: "BRL",
  description:
    "Point Mini a maquininha que dá o dinheiro de suas vendas na hora.",
  taxes_amount: 0,
  shipping_amount: 0,
  collector_id: 448876418,
  payer: {
    id: 123,
    email: "test_user_80507629@testuser.com",
    identification: {
      number: 19119119100,
      type: "CPF",
    },
    type: "customer",
  },
  metadata: {},
  additional_info: {
    items: [
      {
        id: "PR0001",
        title: "Point Mini",
        description:
          "Producto Point para cobros con tarjetas mediante bluetooth",
        picture_url:
          "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
        category_id: "electronics",
        quantity: 1,
        unit_price: 58.8,
      },
    ],
    payer: {
      registration_date: "2019-01-01T15:01:01.000Z",
    },
    shipments: {
      receiver_address: {
        street_name: "Av das Nacoes Unidas",
        street_number: 3003,
        zip_code: 6233200,
        city_name: "Buzios",
        state_name: "Rio de Janeiro",
      },
    },
  },
  external_reference: "MP0001",
  transaction_amount: 58.8,
  transaction_amount_refunded: 0,
  coupon_amount: 0,
  transaction_details: {
    net_received_amount: 56.16,
    total_paid_amount: 58.8,
    overpaid_amount: 0,
    installment_amount: 58.8,
  },
  fee_details: [
    {
      type: "coupon_fee",
      amount: 2.64,
      fee_payer: "payer",
    },
  ],
  statement_descriptor: "MercadoPago",
  installments: 1,
  card: {
    first_six_digits: 423564,
    last_four_digits: 5682,
    expiration_month: 6,
    expiration_year: 2023,
    date_created: "2019-07-10T14:47:58.000Z",
    date_last_updated: "2019-07-10T14:47:58.000Z",
    cardholder: {
      name: "APRO",
      identification: {
        number: 19119119100,
        type: "CPF",
      },
    },
  },
  notification_url: "https://www.suaurl.com/notificacoes/",
  processing_mode: "aggregator",
  point_of_interaction: {
    type: "PIX",
    application_data: {
      name: "NAME_SDK",
      version: "VERSION_NUMBER",
    },
    transaction_data: {
      qr_code_base64:
        "iVBORw0KGgoAAAANSUhEUgAABRQAAAUUCAYAAACu5p7oAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAIABJREFUeJzs2luO3LiWQNFmI+Y/Zd6vRt36KGNXi7ZOBtcagHD4kNLeiLX33v8DAAAAABD879sDAAAAAAA/h6AIAAAAAGSCIgAAAACQCYoAAAAAQCYoAgAAAACZoAgAAAAAZIIiAAAAAJAJigAAAABAJigCAAAAAJmgCAAAAABkgiIAAAAAkAmKAAAAAEAmKAIAAAAAmaAIAAAAAGSCIgAAAACQCYoAAAAAQCYoAgAAAACZoAgAAAAAZIIiAAAAAJAJigAAAABAJigCA...",
      qr_code:
        "00020126600014br.gov.bcb.pix0117test@testuser.com0217dados adicionais520400005303986540510.005802BR5913Maria Silva6008Brasilia62070503***6304E2CA",
      ticket_url:
        "https://www.mercadopago.com.br/payments/123456789/ticket?caller_id=123456&hash=123e4567-e89b-12d3-a456-426655440000",
    },
  },
};

// *Este es el objeto que se recibe de la plataforma de pago de MercadoPago cuando la transacción es correcta.
// ! VERIFICAR CON EL QUOKKA
// *Deben enviar al Back la siguiente info para crear el pago, en este caso de un plan:
let userId = 5; // *Id del usuario. Esto es un ejemplo para que funcionara con el Quokka, OJO!
let planId = 2; // *Id del plan. Esto es un ejemplo para que funcionara con el Quoka, OJO!

// *El price, el code,la description y date lo extraen de este objeto de arriba como se indica acá abajo:

const data_de_ejemplo_pago_de_plan = {
  user: userId,
  planId: planId,
  description: payment.description,
  price: payment.transaction_amount,
  code: payment.id,
  date: payment.date_created,
};

console.log(data_de_ejemplo_pago_de_plan);

// *Para el caso de el pago de un análisis clínico, el objeto que se debe enviar es un poco diferente; allí deben enviar la siguiente info:

let ticketsId = 2; // *Id del ticketAnalysis. Esto es un ejemplo para que funcionara con el Quokka, OJO!

const data_de_ejemplo_pago_de_analysis = {
  user: userId,
  ticketsIds: ticketsId,
  description: payment.description,
  price: payment.transaction_amount,
  code: payment.id,
  date: payment.date_created,
};

console.log(data_de_ejemplo_pago_de_analysis);
