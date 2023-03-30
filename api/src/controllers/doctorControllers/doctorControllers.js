const { Doctor, Speciality, Schedule, User } = require("../../db");
const { Op } = require("sequelize");

// *Este helper nos permite traer los Medicos de la base de datos, filtrar a través de la propiedad is_delete,  implementarlo en las rutas que lo requieran:
const getDoctors = async () => {
  const request = await Doctor.findAll({
    include: [
      {
        model: Speciality,
        through: { attributes: [] },
      },
      {
        model: Schedule,
        through: { attributes: [] },
      },
      {
        model: User,
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
        through: { attributes: [] },
      },
      {
        model: Schedule,
        through: { attributes: [] },
      },
      {
        model: User,
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
        through: { attributes: [] },
      },
      {
        model: Schedule,
        through: { attributes: [] },
      },
      {
        model: User,
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
        through: { attributes: [] },
      },
      {
        model: Schedule,
        through: { attributes: [] },
      },
      {
        model: User,
      },
    ],
  });
  if (request && request.is_delete === false) {
    return [request];
  } else {
    return "No existe Médico con ese Id";
  }
};

// *Este controller permite crear un médico:
const createDoctor = async (
  code,
  dni,
  full_name,
  gender,
  age,
  birthday,
  phone,
  address,
  image,
  specialities
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
  });

  let specialitys = await Speciality.findAll({
    where: { speciality: specialities },
  });
  await newDoctor.addSpeciality(specialitys);

  const doctor_created = await Doctor.findOne({
    where: { full_name: { [Op.iLike]: `%${full_name}%` } },
    include: {
      model: Speciality,
      attributes: ["speciality"],
      through: { attributes: [] },
    },
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

// *Este controller permite borrar TODOS los horarios de un doctor a través del Id del doctor:
const deleteSchedule = async (id) => {
  const request = await Doctor.findByPk(id, {
    include: {
      model: Schedule,
      through: { attributes: [] },
    },
  });
  await request.schedules.forEach((item) => {
    item.set({
      is_delete: true,
    });
    item.save();
  });

  return "Se han borrado los horarios exitosamente";
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
};
