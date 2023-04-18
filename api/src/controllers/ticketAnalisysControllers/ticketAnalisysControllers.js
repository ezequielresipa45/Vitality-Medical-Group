const { Patient, TicketAnalysis, Analysis } = require("../../db.js");
// *Este controller permite crear el TicketAnalysis, realizar la asociación entre TicketAnalysis y Analysis y paciente a TicketAnalysis:
const createTicket = async (idAnalysis, title, observations, idPatient, date, hour, price) => {
  const requestTicketAnalysis = await TicketAnalysis.create({
    title,
    observations,
    date,
    hour,
    price,
  });

  const analysis = await Analysis.findByPk(idAnalysis);
  await analysis.addTicketAnalysis(requestTicketAnalysis);
  await analysis.save();

  const patient = await Patient.findByPk(idPatient);
  await patient.addTicketAnalysis(requestTicketAnalysis);
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

// *Este controller permite borrar/destruir(borrado fisico) todos ticketsAnalysis .
const destroyAllTicket = async () => {
  const request = await TicketAnalysis.findAll();

  await request.forEach(function (item) {
    item.destroy();
  });

  return "Todos los registros de los turnos para análisis clínico fueron exitosamente destruidos";
};

module.exports = {
  createTicket,
  allTickets,
  ticketAnalisysId,
  deleteTicketAnalisys,
  destroyAllTicket,
};
