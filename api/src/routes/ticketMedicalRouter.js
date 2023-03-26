const { Router } = require("express");
const {
  ticketMedicalHandler,
  confirmTicketHandler,
  allTicketHandler,
  ticketIdHandler,
} = require("../handlers/ticketMedicalHandlers/ticketMedicalHandlers.js");
const {
  validatorCreateTicketMedical,
} = require("../middlewares/validators.js");

// *Acá definimos las rutas de turnos médicos:
const ticketMedicalRouter = Router();

ticketMedicalRouter.get("/", allTicketHandler);

ticketMedicalRouter.get("/", ticketIdHandler);

ticketMedicalRouter.post(
  "/createTicketMedical",
  validatorCreateTicketMedical,
  ticketMedicalHandler
);

ticketMedicalRouter.put("/confirmTicket", confirmTicketHandler);

ticketMedicalRouter.delete("/confirmTicket", confirmTicketHandler);

module.exports = ticketMedicalRouter;
