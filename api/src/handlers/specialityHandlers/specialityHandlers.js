const {
  getSpeciality,
  createSpeciality,
  changeSpeciality,
  deleteSpeciality,
} = require("../../controllers/specialityControllers/specialityControllers.js");

const GET_SPECIALITY = async (req, res) => {
  const data = await getSpeciality();
  res.status(200).json(data);
};

const POST_SPECIALITY = async (req, res) => {
  try {
    const params = req.body;
    console.log(req.body);
    const data = await createSpeciality(params);
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const PUT_SPECIALITY = async (req, res) => {
  try {
    const { id, speciality } = req.body;
    const data = await changeSpeciality(id, speciality);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DELETE_SPECIALITY = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteSpeciality(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  GET_SPECIALITY,
  POST_SPECIALITY,
  PUT_SPECIALITY,
  DELETE_SPECIALITY,
};
