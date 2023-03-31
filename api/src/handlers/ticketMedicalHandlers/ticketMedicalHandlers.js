const {
  createTicket,
  confirmTicket,
  allTicketMedicals,
  getTicketId,
  deleteTicket,
} = require("../../controllers/ticketMedicalControllers/ticketMedicalControllers.js");

const ticketMedicalHandler = async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      observations,
      doctorId,
      patientId,
      date,
      hour_start,
      hour_end,
    } = req.body;
    const request = await createTicket(
      title,
      observations,
      doctorId,
      patientId,
      date,
      hour_start,
      hour_end
    );
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const confirmTicketHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const request = await confirmTicket(id);
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const allTicketHandler = async (req, res) => {
  try {
    const request = await allTicketMedicals();
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const ticketIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await getTicketId(id);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTicketHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await deleteTicket(id);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  ticketMedicalHandler,
  confirmTicketHandler,
  allTicketHandler,
  ticketIdHandler,
  deleteTicketHandler,
};
