const { Comment, User } = require("../../db");

const CreateComment = async (userId, comment, rating) => {
  const requestUser = await User.findByPk(userId);
  const requestComment = await Comment.create({
    comment,
    rating,
  });
  await requestUser.addComment(requestComment);
  await requestUser.save();

  return "Comentario creado satisfactoriamente";
};

const getComments = async () => {
  const request = await Comment.findAll();
  return request;
};

const getCommentsUser = async (userId) => {
  const request = await Comment.findAll({
    where: {
      userId: userId,
    },
  });
  return request;
};

module.exports = {
  CreateComment,
  getComments,
  getCommentsUser,
};
