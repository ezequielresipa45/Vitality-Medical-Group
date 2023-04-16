const {
  Patient,
  TicketMedical,
  TicketAnalysis,
  User,
  Plan,
} = require("../../db");
const { Op } = require("sequelize");

// *Este helper nos permite traer los Pacientes de la base de datos e implementarlo en las rutas que lo requieran:
const getPatients = async () => {
  const request = await Patient.findAll({
    include: [
      {
        model: TicketMedical,
      },
      {
        model: TicketAnalysis,
      },
      {
        model: User,
      },
      {
        model: Plan,
        attributes: ["name"],
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
      {
        model: TicketAnalysis,
      },
      {
        model: User,
      },
      {
        model: Plan,
        attributes: ["name"],
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
      {
        model: TicketAnalysis,
      },
      {
        model: User,
      },
      {
        model: Plan,
        attributes: ["name"],
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
        model: TicketAnalysis,
      },
      {
        model: User,
      },
      {
        model: Plan,
        attributes: ["name"],
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
  address
) => {
  const patient = await Patient.create({
    full_name,
    dni,
    gender,
    age,
    birthday,
    phone,
    address,
  });

  const user = await User.findByPk(idUser);
  await patient.setUser(user);
  await patient.save();

  const plan = await Plan.findByPk(planId);
  await patient.setPlan(plan);
  await patient.save();

  const patient_created = await Patient.findOne({
    where: { full_name: { [Op.iLike]: `%${full_name}%` } },
    include: [
      {
        model: User,
      },
      {
        model: Plan,
        attributes: ["name"],
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
  const request = await Patient.findByPk(id);
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

const getPatientsDeleted = async () => {
  const request = await Patient.findAll({
    where: {
      is_delete: true,
    },
  });

  return request;
};

const recoverPatient = async (id) => {
  const request = await Patient.findByPk(id);
  await request.set({
    is_delete: false,
  });
  await request.save();

  return request;
};

module.exports = {
  searchPatientByName,
  getAllPatients,
  findDniPatient,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientsDeleted,
  recoverPatient,
};
