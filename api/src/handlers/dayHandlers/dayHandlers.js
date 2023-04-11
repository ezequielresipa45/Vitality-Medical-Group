const {
  getDays,
  createDay,
} = require("../../controllers/dayControllers/dayControllers");

const getDaysHandler = async (req, res) => {
  try {
    const request = await getDays();
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createDayHandler = async (req, res) => {
  try {
    const { day } = req.body;
    const request = await createDay(day);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDaysHandler,
  createDayHandler,
};
