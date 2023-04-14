const {
  createPago,
  getPago,
} = require("../../controllers/mercadoPagoController/mercadoPagoController");

const POST_PAGO = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      picture_url,
      quantity,
      currency_id,
      unit_price,
    } = req.body;
    console.log("pase por el handler");
    console.log(
      id,
      title,
      description,
      picture_url,
      quantity,
      currency_id,
      unit_price
    );
    const request = await createPago(
      id,
      title,
      description,
      picture_url,
      quantity,
      currency_id,
      unit_price
    );
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GET_FILE = async (req, res) => {
  const { file } = req.query;
  res.status(200).json(getPago(file));
};

module.exports = {
  POST_PAGO,
  GET_FILE,
};
