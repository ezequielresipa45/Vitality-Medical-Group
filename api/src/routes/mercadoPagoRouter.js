const { Router } = require("express");

const {POST_PAGO, GET_FILE} = require('../handlers/mercadoPagoHandlers/mercadoPagoHandlers')


const mercadoPagoRouter = Router();

mercadoPagoRouter.post('/', POST_PAGO)
mercadoPagoRouter.get('/', GET_FILE)

module.exports = mercadoPagoRouter