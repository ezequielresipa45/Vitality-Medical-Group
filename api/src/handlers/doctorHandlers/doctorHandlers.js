const {
  getAllNames,
  searchDoctorByName,
  getAllDoctors,
  findDni,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  deleteSchedule,
} = require("../../controllers/doctorControllers/doctorControllers.js");

const getNamesHandler = async (req, res) => {
  try {
    const request = await getAllNames();
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDniHandler = async (req, res) => {
  try {
    const { dni } = req.body;
    const request = await findDni(dni);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDoctorsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const request = name
      ? await searchDoctorByName(name)
      : await getAllDoctors();
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDoctorIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw Error("El Id es necesario para buscar al Médico");
    const request = await getDoctorById(id);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createDoctorHandler = async (req, res) => {
  try {
    const {
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
    } = req.body;
    const request = await createDoctor(
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
      is_delivery
    );
    return res.status(201).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateDoctorHandler = async (req, res) => {
  try {
    const { id, phone, address, image } = req.body;
    const request = await updateDoctor(id, phone, address, image);
    return res.status(201).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteDoctorHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await deleteDoctor(id);
    return res.status(200).json({ message: request });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteScheduleHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await deleteSchedule(id);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getNamesHandler,
  getDoctorsHandler,
  getDniHandler,
  getDoctorIdHandler,
  createDoctorHandler,
  updateDoctorHandler,
  deleteDoctorHandler,
  deleteScheduleHandler,
};
