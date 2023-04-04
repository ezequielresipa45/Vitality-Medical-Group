const {
  CreateComment,
  getComments,
  getCommentsUser,
} = require("../../controllers/commentControllers/commentControllers.js");

const createCommentHandler = async (req, res) => {
  try {
    const { userId, comment, rating } = req.body;
    const request = await CreateComment(userId, comment, rating);
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getCommentsHandler = async (req, res) => {
  try {
    const request = await getComments();
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCommentsUserHandler = async (req, res) => {
  try {
    const { userId } = req.body;
    const request = await getCommentsUser(userId);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCommentHandler,
  getCommentsHandler,
  getCommentsUserHandler,
};
