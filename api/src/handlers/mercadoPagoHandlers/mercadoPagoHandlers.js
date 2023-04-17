
const {createPago, createPago_V2} = require('../../controllers/mercadoPagoController/mercadoPagoController')


const POST_PAGO = async (req, res) => {
  try {
    const {id, title, description, picture_url, quantity, currency_id, unit_price} =req.body
    const request = await createPago(id, title, description, picture_url, quantity, currency_id, unit_price);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const GET_FILE= async (req, res) => {
    try {
      const {collection_status} = req.query
        console.log(collection_status);
          return res.status(200).json(req.query);
    } catch (error) {
          return res.status(400).json({error:error.message})
    }
 
        };


  const POST_PAGO_V2 = async (req, res) => {
    const { plan, medical, analisys } = req.body
    try{
      const request = await createPago_V2(plan, medical, analisys)
      return res.status(200).json(request)
    }catch(error) {
      console.log(error)
      return res.status(400).json({error: error.message})
    }
  }     

  const GET_FILE_V2 = async (req,res) => {

  }




module.exports = {
  POST_PAGO,
  GET_FILE,
  POST_PAGO_V2,
  GET_FILE_V2,
};
