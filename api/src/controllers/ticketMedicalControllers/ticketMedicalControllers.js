const { Doctor, Patient, Schedule, TicketMedical } = require("../../db");

// *Este controller permite crear el TicketMedical, crear el Schedule asociado a ese ticket y realizar la asociación de doctor a schedule y paciente a ticketMedical:
const createTicket = async (
  title,
  observations,
  doctorId,
  patientId,
  date,
  hour_start,
  hour_end
) => {
  const requestTicket = await TicketMedical.create({
    title,
    observations,
    date,
    hour_start,
  });

  const requestSchedule = await Schedule.create({ date, hour_start, hour_end }); // ?correcto

  await requestTicket.setSchedule(requestSchedule); // ?correcto
  await requestTicket.save();

  const doctor = await Doctor.findByPk(doctorId); // ?correcto
  await doctor.addSchedule(requestSchedule); // ?correcto
  await doctor.save();

  await doctor.addTicketMedical(requestTicket); // ?correcto
  await doctor.save();

  const patient = await Patient.findByPk(patientId); // ?correcto
  await patient.addTicketMedical(requestTicket); // ?correcto
  await requestTicket.save(); /// ?correcto

  return "Turno creado exitosamente";
};

// *Este controller permite setear la propiedad "is_confirmed" de un ticket a "true" y eliminar esa info de la tabla schedule de un doctor.
const confirmTicket = async (ticketId) => {
  const request = await TicketMedical.findByPk(ticketId);
  request.set({
    is_confirmed: true,
  });
  await request.save();

  const associatedSchedule = await request.getSchedule();
  await associatedSchedule.destroy();

  return "El turno ha sido confirmado exitosamente";
};

// *Este controller permite devolver todos los ticketsMedicals.
const allTicketMedicals = async () => {
  const request = await TicketMedical.findAll({ include: { all: true } });
  return request;
};

// *Este controller permite buscar un ticketsMedicals por id.
const getTicketId = async (id) => {
  const request = await TicketMedical.findByPk(id, { include: { all: true } });
  return request;
};

// *Este controller permite borrar un ticketsMedicals por id.
const deleteTicket = async (id) => {
  const request = await TicketMedical.findByPk(id, { include: { all: true } });
  const idSchedule = request.schedule.id;
  const requestSchedule = await Schedule.findByPk(idSchedule);

  requestSchedule.destroy();
  request.destroy();

  return "El Turno médico fue borrado exitosamente";
};

module.exports = {
  createTicket,
  confirmTicket,
  allTicketMedicals,
  getTicketId,
  deleteTicket,
};
