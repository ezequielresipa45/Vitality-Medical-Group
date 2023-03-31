const { Patient, TicketAnalysis, Analysis } = require("../../db.js");
// *Este controller permite crear el TicketAnalysis, realizar la asociación entre TicketAnalysis y Analysis y paciente a TicketAnalysis:
const createTicket = async (idAnalysis, idPatient, date, hour, price) => {
  const requestAnalysis = await TicketAnalysis.create({
    date,
    hour,
    price,
  });

  const analysis = await Analysis.findByPk(idAnalysis);
  await requestAnalysis.AddAnalysis(analysis);
  await requestAnalysis.save();

  const patient = await Patient.findByPk(idPatient);
  await patient.addTicketAnalysis(requestAnalysis);
  await patient.save();

  return "Turno creado exitosamente";
};

// *Este controller devuelve todos los turnos de análisis.
const allTickets = async () => {
  const request = await TicketAnalysis.findAll({ include: { all: true } });
  const filtered = request.filter((item) => item.is_delete !== true);
  return filtered;
};

// *Este controller permite buscar un turno para análisis por Id y devolverlo.
const ticketAnalisysId = async (id) => {
  const request = await TicketAnalysis.findByPk(id, { include: { all: true } });
  if (request && request.is_delete === false) {
    return request;
  } else {
    return "No existe turno para análisis clinico con ese Id";
  }
};

// *Este controller permite buscar un turno para análisis por Id y devolverlo.
const deleteTicketAnalisys = async (id) => {
  const request = await TicketAnalysis.findByPk(id);
  await request.set({
    is_delete: true,
  });
  await request.save();

  return "El turno para análisis clinico fue borrado exitosamente";
};

module.exports = {
  createTicket,
  allTickets,
  ticketAnalisysId,
  deleteTicketAnalisys,
};
