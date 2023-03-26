const { Router } = require("express");
const {
    getPaidsHandler,
    getPaidByIdHandler,
    getPaidsByUserHandler,
    updateByIdHandler,
    createPaidHandler
} = require("../handlers/paidHandlers/paidHandlers.js")

// *Acá definimos las rutas de usuarios:
const paidsRouter = Router();

// !POR DEFINIR...

paidsRouter.get("/", getPaidsHandler)
paidsRouter.get("/:id", getPaidByIdHandler)
paidsRouter.get("/:userId/user", getPaidsByUserHandler)
paidsRouter.put("/", updateByIdHandler)
paidsRouter.post("/", createPaidHandler)

module.exports = paidsRouter;
