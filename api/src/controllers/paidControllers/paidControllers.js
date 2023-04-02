const { Paids } = require("../../db.js");

const getPaidsByUserId = async (userId) => {
  const paids = await Paids.findAll({
    where: {
      userId: userId,
    },
  });

  return paids;
};

const getPaidById = async (id) => {
  const paid = await Paids.findByPk(id);
  return paid;
};

module.exports = {
  getPaidsByUserId,
  getPaidById,
};
