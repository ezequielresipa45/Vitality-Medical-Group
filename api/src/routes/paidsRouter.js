const { Router } = require("express");
const {
  getPaidByIdHandler,
  getPaidsByUserHandler,
} = require("../handlers/paidHandlers/paidHandlers.js");

// *Acá definimos las rutas de usuarios:
const paidsRouter = Router();

paidsRouter.get("/", getPaidsByUserHandler);
paidsRouter.get("/:id", getPaidByIdHandler);

module.exports = paidsRouter;
