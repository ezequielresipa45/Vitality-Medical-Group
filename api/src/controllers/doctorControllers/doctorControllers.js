const { Doctor, Speciality, Schedule, User, Day } = require("../../db");
const { Op } = require("sequelize");

// *Este helper nos permite traer los Medicos de la base de datos, filtrar a través de la propiedad is_delete,  implementarlo en las rutas que lo requieran:
const getDoctors = async () => {
  const request = await Doctor.findAll({
    include: [
      {
        model: Speciality,
        attributes: ["speciality"],
        through: { attributes: [] },
      },
      {
        model: Schedule,
      },
      {
        model: User,
      },
      {
        model: Day,
        attributes: ["day"],
        through: { attributes: [] },
      },
    ],
  });

  let filtered = request.filter((item) => item.is_delete !== true);

  return filtered;
};

// *Este controller busca a un paciente por nombre:
const getAllNames = async () => {
  const request = await Doctor.findAll();
  const names = request
    .filter((item) => item.is_delete !== true)
    .map((item) => item.full_name)
    .flat();
  return names;
};

// *Este controller busca a un médico por nombre:
const searchDoctorByName = async (full_name) => {
  const request = await Doctor.findOne({
    where: { full_name: { [Op.iLike]: `%${full_name}%` } },
    include: [
      {
        model: Speciality,
        attributes: ["speciality"],
        through: { attributes: [] },
      },
      {
        model: Schedule,
      },
      {
        model: User,
      },
      {
        model: Day,
        attributes: ["day"],
        through: { attributes: [] },
      },
    ],
  });
  if (request && request.is_delete === false) {
    return [request];
  } else {
    return "No existe Médico con ese nombre";
  }
};

// *Este controller busca a un médico por DNI:
const findDni = async (dni) => {
  const request = await Doctor.findOne({
    where: { dni: dni },
    include: [
      {
        model: Speciality,
        attributes: ["speciality"],
        through: { attributes: [] },
      },
      {
        model: Schedule,
      },
      {
        model: User,
      },
      {
        model: Day,
        attributes: ["day"],
        through: { attributes: [] },
      },
    ],
  });

  if (request && request.is_delete === false) {
    return request;
  } else {
    return "No existe Médico con ese DNI";
  }
};

// *Este controller obtiene todos los médicos:
const getAllDoctors = async () => {
  const request = await getDoctors();
  return request;
};

// *Este controller busca a un médico por id:
const getDoctorById = async (id) => {
  const request = await Doctor.findByPk(id, {
    include: [
      {
        model: Speciality,
        attributes: ["speciality"],
        through: { attributes: [] },
      },
      {
        model: Schedule,
      },
      {
        model: User,
      },
      {
        model: Day,
        attributes: ["day"],
        through: { attributes: [] },
      },
    ],
  });
  if (request && request.is_delete === false) {
    return request;
  } else {
    return "No existe Médico con ese Id";
  }
};

// *Este controller permite crear un médico:
const createDoctor = async (
  idUser,
  code,
  dni,
  full_name,
  gender,
  age,
  birthday,
  phone,
  address,
  image,
  specialities,
  is_delivery,
  day,
  is_morning,
  is_evening
) => {
  let newDoctor = await Doctor.create({
    code,
    dni,
    full_name,
    gender,
    age,
    birthday,
    phone,
    address,
    image,
    is_delivery,
    day,
    is_morning,
    is_evening,
  });

  let days = await Day.findAll({ where: { day: day } });
  await newDoctor.addDay(days);

  let specialitys = await Speciality.findAll({
    where: { speciality: specialities },
  });
  await newDoctor.addSpeciality(specialitys);

  const user = await User.findByPk(idUser);
  await user.addDoctor(newDoctor);

  const doctor_created = await Doctor.findOne({
    where: { full_name: { [Op.iLike]: `%${full_name}%` } },
    include: [
      {
        model: Speciality,
        attributes: ["speciality"],
        through: { attributes: [] },
      },
      {
        model: Day,
        attributes: ["day"],
        through: { attributes: [] },
      },
      { model: User },
    ],
  });
  return {
    message: "El registro del médico se ha creado exitosamente",
    doctor_created,
  };
};

// *Este controller permite actualizar un médico buscándolo por id:
const updateDoctor = async (id, phone, address, image) => {
  const request = await Doctor.findByPk(id);
  if (request && request.is_delete === false) {
    await request.set({
      phone: phone,
      address: address,
      image: image,
    });

    await request.save();

    return [request];
  } else {
    return "No existe Médico con ese Id";
  }
};

// *Este controller elimina un médico por id:
const deleteDoctor = async (id) => {
  const request = await Doctor.findByPk(id);
  if (request && request.is_delete === false) {
    request.set({
      is_delete: true,
    });
    await request.save();
    return "El Médico fue borrado exitosamente";
  } else {
    return "No existe Médico con ese Id";
  }
};

// *Este controller permite borrar TODOS los turnos de un doctor de una fecha en concreto:
const deleteSchedule = async (id, date) => {
  const request = await Doctor.findByPk(id, {
    include: {
      model: Schedule,
      where: {
        date: date,
      },
    },
  });
  await request.schedules.forEach((item) => {
    item.set({
      is_delete: true,
    });
    item.save();
  });
  return "Se han borrado los turnos del Médico exitosamente";
};

// *Este controller permite actualizar los días de trabajo de un doctor, y su turno indicando si trabaja en la mañana, en la tarde o en ambos:
const updateMedicalGuard = async (doctorId, is_morning, is_evening) => {
  const request = await Doctor.findByPk(doctorId, {
    include: [
      {
        model: Speciality,
        attributes: ["speciality"],
        through: { attributes: [] },
      },
      {
        model: Day,
        attributes: ["day"],
        through: { attributes: [] },
      },
      { model: User },
    ],
  });
  await request.set({
    is_morning: is_morning,
    is_evening: is_evening,
  });
  await request.save();

  return request;
};

const getDoctorsDeleted = async () => {
  const request = await Doctor.findAll({
    where: {
      is_delete: true,
    },
  });

  return request;
};

const recoverDoctor = async (id) => {
  const request = await Doctor.findByPk(id);
  await request.set({
    is_delete: false,
  });
  await request.save();

  return request;
};

module.exports = {
  getAllNames,
  searchDoctorByName,
  getAllDoctors,
  findDni,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  deleteSchedule,
  updateMedicalGuard,
  getDoctorsDeleted,
  recoverDoctor,
};
