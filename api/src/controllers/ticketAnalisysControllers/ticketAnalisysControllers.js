const { Doctor, Patient, Schedule, TicketAnalysis } = require("../../db");
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
  const requestTicket = await TicketAnalysis.create({
    title,
    observations,
    date,
    hour_start,
  });

  const requestSchedule = await Schedule.create({ date, hour_start, hour_end });

  const doctor = await Doctor.findByPk(doctorId);
  await doctor.addSchedule(requestSchedule);
  await doctor.save();

  await TicketMedical.setSchedule(requestSchedule);

  const patient = await Patient.findByPk(patientId);
  await patient.addTicketmedical(requestTicket);
  await patient.save();

  return;
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

  return "El turno para análisis ha sido confirmado exitosamente";
};

module.exports = {
  createTicket,
  confirmTicket,
};