const { Speciality, Doctor } = require("../../db");
const { Op } = require("sequelize");

const filterSpecialityDB = (item) => {
  return {
    id: item.id,
    speciality: item.speciality,
    doctors: item.doctors,
    is_delete: item.is_delete,
  };
};

//getSpeciality devuelve todos los campos que tenga la tabla Speciality
const getSpeciality = async () => {
  const request = await Speciality.findAll({
    include: {
      model: Doctor,
      attributes: ["id", "full_name"],
      through: { attributes: [] },
    },
  });
  let filtered = request
    .map((item) => filterSpecialityDB(item))
    .filter((item) => item.is_delete !== true)
    .flat();

  return filtered;
};
// createSpeciality permite crear mas especialidades en la tabla Speciality

const createSpeciality = async (params) => {
  if (params) {
    const nuevaSpeciality = await Speciality.create({
      speciality: params.speciality,
    });
    return {
      message: `El registro de especialidad ${params.speciality} se ha creado exitosamente`,
    };
  } else {
    throw new Error(
      "Necesita parametros para crear el registro de especialidad"
    );
  }
};

// changeSpeciality modifica el valor de la tabla Speciality

const changeSpeciality = async (id, speciality) => {
  const request = await Speciality.findByPk(id);
  if (request) {
    request.speciality = speciality;
    await request.save();
    //let filtered = filterDB(request);
    return { message: "modificado con exito" };
  } else {
    throw new Error("Registro no encontrado");
  }
};

// deleteSpeciality permite eliminar especialidades en la tabla Speciality
const deleteSpeciality = async (id) => {
  const request = await Speciality.findByPk(id);

  if (!request) {
    throw new Error("La Especialidad no fue encontrado");
  }

  request.set({
    is_delete: true,
  });
  await request.save();

  return "La Especialidad fue borrado exitosamente";
};
module.exports = {
  getSpeciality,
  createSpeciality,
  changeSpeciality,
  deleteSpeciality,
};
