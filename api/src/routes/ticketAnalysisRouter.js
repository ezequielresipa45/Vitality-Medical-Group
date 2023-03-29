const { Router } = require("express");
const {
  ticketAnalisysHandler,
  confirmTicketAnalisysHandler,
  allTicketAnalisysHandler,
  ticketAnalisysIdHandler,
  deleteTicketAnalisysHandler,
} = require("../handlers/ticketAnalisysHandlers/ticketAnalisysHandlers.js");
const {
  validatorCreateTicketAnalisys,
} = require("../middlewares/validators.js");

// *Acá definimos las rutas de turnos médicos:
const ticketAnalisysRouter = Router();

//ticketAnalisysRouter.get("/", allTicketAnalisysHandler);

//ticketAnalisysRouter.get("/:id", ticketAnalisysIdHandler);

ticketAnalisysRouter.post("/createTicketAnalisys", /*validatorCreateTicketAnalisys*/ ticketAnalisysHandler
);

ticketAnalisysRouter.put("/confirmTicket", confirmTicketAnalisysHandler);

//ticketAnalisysRouter.delete("/:id/delete", deleteTicketAnalisysHandler);

module.exports = ticketAnalisysRouter;
