const { Router } = require("express");
const {
  createTicketAnalisysHandler,
  allTicketAnalisysHandler,
  ticketAnalisysIdHandler,
  deleteTicketAnalisysHandler,
  destroyAllTicketHandler,
} = require("../handlers/ticketAnalisysHandlers/ticketAnalisysHandlers.js");
const {
  validatorCreateTicketAnalisys,
} = require("../middlewares/validators.js");

// *Acá definimos las rutas de turnos para análisis:
const ticketAnalisysRouter = Router();

ticketAnalisysRouter.get("/", allTicketAnalisysHandler);

ticketAnalisysRouter.get("/:id", ticketAnalisysIdHandler);

ticketAnalisysRouter.post(
  "/createTicketAnalisys",
  validatorCreateTicketAnalisys,
  createTicketAnalisysHandler
);

ticketAnalisysRouter.delete("/destroyAllTicket", destroyAllTicketHandler);

ticketAnalisysRouter.delete("/:id/delete", deleteTicketAnalisysHandler);

module.exports = ticketAnalisysRouter;
