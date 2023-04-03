const {
  getPaidsByUserId,
  getPaidById,
} = require("../../controllers/paidControllers/paidControllers.js");

const getPaidsByUserHandler = async (req, res) => {
  try {
    const { userId } = req.body;
    const paids = await getPaidsByUserId(userId);
    return res.status(200).json(paids);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPaidByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const paid = await getPaidById(id);
    res.status(200).json(paid);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getPaidByIdHandler,
  getPaidsByUserHandler,
};
