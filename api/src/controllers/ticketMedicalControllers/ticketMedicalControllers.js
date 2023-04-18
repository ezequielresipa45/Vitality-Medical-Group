const { Doctor, Patient, Schedule, TicketMedical, Day } = require("../../db");

// *Este controller permite crear el TicketMedical, crear el Schedule asociado a ese ticket y realizar la asociación de doctor a schedule y paciente a ticketMedical:
const createTicket = async (
  title,
  observations,
  day,
  doctorId,
  patientId,
  date,
  hour
) => {
  const ticketMedical = await TicketMedical.create({
    title,
    observations,
    date,
    hour,
  });

  const schedule = await Schedule.create({ date, hour }); // ?correcto
  await schedule.setTicketMedical(ticketMedical);
  await schedule.save();

  const requestDay = await Day.findOne({ where: { day: day } });
  await requestDay.addTicketMedical(ticketMedical); // ?correcto
  await requestDay.save();

  await requestDay.addSchedule(schedule); // ?correcto
  await requestDay.save();

  const doctor = await Doctor.findByPk(doctorId);
  await doctor.addSchedules(schedule); // ?correcto
  await doctor.save();

  await doctor.addTicketMedicals(ticketMedical); // ?correcto
  await doctor.save();

  const patient = await Patient.findByPk(patientId);
  await patient.addTicketMedical(ticketMedical); // ?correcto
  await patient.save();

  return "Turno creado exitosamente";
};

// *Este controller permite setear la propiedad "is_confirmed" de un ticket a "true" y eliminar esa info de la tabla schedule de un doctor.
const confirmTicket = async (id) => {
  const request = await TicketMedical.findByPk(id, { include: { all: true } });
  await request.set({
    is_confirmed: true,
  });
  await request.save();

  return "El turno ha sido confirmado exitosamente";
};

// *Este controller permite devolver todos los ticketsMedicals.
const allTicketMedicals = async () => {
  const request = await TicketMedical.findAll({ include: { all: true } });
  const filtered = request.filter((item) => item.is_delete !== true);
  return filtered;
};

// *Este controller permite buscar un ticketsMedicals por id.
const getTicketId = async (id) => {
  const request = await TicketMedical.findByPk(id, { include: { all: true } });
  if (request && request.is_delete === false) {
    return request;
  } else {
    return "No existe turno médico con ese ID";
  }
};

// *Este controller permite borrar(borrado lógico) un ticketsMedicals por id.
const deleteTicket = async (id) => {
  const request = await TicketMedical.findByPk(id, { include: { all: true } });
  const idSchedule = request.schedule.id;
  const requestSchedule = await Schedule.findByPk(idSchedule);
  await request.set({
    is_delete: true,
  });
  await request.save();

  await requestSchedule.set({
    is_delete: true,
  });
  await requestSchedule.save();

  return "El Turno médico fue borrado exitosamente";
};

// *Este controller permite borrar/destruir(borrado fisico) el registro de un ticketsMedicals por id.
const destroyTicket = async (idTicket) => {
  const request = await TicketMedical.findByPk(idTicket, {
    include: { all: true },
  });
  const idSchedule = request.schedule.id;
  const requestSchedule = await Schedule.findByPk(idSchedule);

  await requestSchedule.destroy();
  await request.destroy();

  return "El Turno médico fue cancelado exitosamente";
};

// *Este controller permite borrar/destruir(borrado fisico) todos ticketsMedicals con sus Schedules asociados.
const destroyAllTicket = async () => {
  const request = await TicketMedical.findAll({
    include: { all: true },
  });
  const idSchedule = request.map((item) => item.schedule.id);
  const requestSchedule = await Schedule.findAll({ where: { id: idSchedule } });

  await requestSchedule.forEach(function (item) {
    item.destroy();
  });
  await request.forEach(function (item) {
    item.destroy();
  });

  return "Todos los registros de los turnos médicos fueron exitosamente destruidos";
};

module.exports = {
  createTicket,
  confirmTicket,
  allTicketMedicals,
  getTicketId,
  deleteTicket,
  destroyTicket,
  destroyAllTicket,
};
