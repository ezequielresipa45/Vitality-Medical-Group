const {
  createTicket,
  allTickets,
  ticketAnalisysId,
  deleteTicketAnalisys,
  destroyAllTicket,
} = require("../../controllers/ticketAnalisysControllers/ticketAnalisysControllers.js");

const createTicketAnalisysHandler = async (req, res) => {
  try {
    const { idAnalysis, title, observations, idPatient, date, hour, price } = req.body;
    const request = await createTicket(
      idAnalysis,
      title,
      observations,
      idPatient,
      date,
      hour,
      price
    );
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const allTicketAnalisysHandler = async (req, res) => {
  try {
    const request = await allTickets();
    return res.status(200).json(request);
  } catch (error) {
    return req.status(400).json({ error: error.message });
  }
};

const ticketAnalisysIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ticketAnalisysId(id);
    return res.status(200).json(request);
  } catch (error) {
    return req.status(400).json({ error: error.message });
  }
};

const deleteTicketAnalisysHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await deleteTicketAnalisys(id);
    return res.status(200).json(request);
  } catch (error) {
    return req.status(400).json({ error: error.message });
  }
};

const destroyAllTicketHandler = async (req, res) => {
  try {
    const request = await destroyAllTicket();
    return res.status(200).json(request);
  } catch (error) {
    return req.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTicketAnalisysHandler,
  allTicketAnalisysHandler,
  ticketAnalisysIdHandler,
  deleteTicketAnalisysHandler,
  destroyAllTicketHandler,
};
