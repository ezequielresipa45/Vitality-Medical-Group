const { Patient, TicketMedical, User, Plan } = require("../../db");
const { Op } = require("sequelize");
const TicketAnalysis = require("../../models/TicketAnalysis");

// *Este helper nos permite traer los Pacientes de la base de datos e implementarlo en las rutas que lo requieran:
const getPatients = async () => {
  const request = await Patient.findAll({
    include: [
      {
        model: TicketMedical,
      },
      // {
      //   model: TicketAnalysis,
      // },
      {
        model: User,
      },
      {
        model: Plan,
      },
    ],
  });
  let filtered = request.filter((item) => item.is_delete !== true);
  return filtered;
};

// *Este controller busca a un paciente por nombre:
const searchPatientByName = async (name) => {
  const request = await Patient.findOne({
    where: { full_name: { [Op.iLike]: `%${name}%` } },
    include: [
      {
        model: TicketMedical,
      },
      // {
      //   model: TicketAnalysis,
      // },
      {
        model: User,
      },
      {
        model: Plan,
      },
    ],
  });
  if (request && request.is_delete === false) {
    return [request];
  } else {
    return "No existe Paciente con ese nombre";
  }
};

// *Este controller obtiene todos los pacientes:
const getAllPatients = async () => {
  const request = await getPatients();
  return request;
};

// *Este controller busca a un paciente por DNI:
const findDniPatient = async (dni) => {
  const request = await Patient.findOne({
    where: { dni: dni },
    include: [
      {
        model: TicketMedical,
      },
      // {
      //   model: TicketAnalysis,
      // },
      {
        model: User,
      },
      {
        model: Plan,
      },
    ],
  });

  if (request && request.is_delete === false) {
    return request;
  } else {
    return "No existe Paciente con ese DNI";
  }
};

// *Este controller busca a un paciente por id:
const getPatientById = async (id) => {
  const request = await Patient.findByPk(id, {
    include: [
      {
        model: TicketMedical,
      },
      {
        model: User,
      },
      {
        model: Plan,
      },
    ],
  });

  if (request && request.is_delete === false) {
    return request;
  } else {
    return "No existe Paciente con ese Id";
  }
};

// *Este controller permite crear un paciente:
const createPatient = async (
  idUser,
  planId,
  full_name,
  dni,
  gender,
  age,
  birthday,
  phone,
  address,
  consultations_available
) => {
  const patient = await Patient.create({
    full_name,
    dni,
    gender,
    age,
    birthday,
    phone,
    address,
    consultations_available,
  });

  const user = await User.findByPk(idUser);
  await patient.setUser(user);

  const plan = await Plan.findByPk(planId);
  await patient.setPlan(plan);

  const patient_created = await Patient.findOne({
    where: { full_name: { [Op.iLike]: `%${full_name}%` } },
    include: [
      {
        model: User,
      },
      {
        model: Plan,
      },
    ],
  });

  return {
    message: "El registro del paciente se ha creado exitosamente",
    patient_created,
  };
};

// *Este controller permite actualizar un paciente buscándolo por id:
const updatePatient = async (id, phone, address) => {
  const request = await Paciente.findByPk(id);
  request.set({
    phone: phone,
    address: address,
  });

  await request.save();

  return request;
};

// *Este controller elimina un paciente por id:
const deletePatient = async (id) => {
  const request = await Patient.findByPk(id);
  request.set({
    is_delete: true,
  });
  await request.save();

  return "El Paciente fue borrado exitosamente";
};

module.exports = {
  searchPatientByName,
  getAllPatients,
  findDniPatient,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
