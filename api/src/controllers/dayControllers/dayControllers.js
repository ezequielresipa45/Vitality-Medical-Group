const {
  Day,
  Schedule,
  Doctor,
  TicketMedical,
  Speciality,
} = require("../../db");
const { Op } = require("sequelize");

// *Este controller nos permite obtener todos los días en los que hay turnos médicos:
const getDays = async () => {
  const request = await Day.findAll({
    include: [
      {
        model: TicketMedical,
      },
      {
        model: Schedule,
      },
      {
        model: Doctor,
        include: {
          model: Speciality,
          attributes: ["speciality"],
          through: { attributes: [] },
        },
        attributes: ["id", "full_name"],
        through: { attributes: [] },
      },
    ],
  });
  return request;
};

// *Este controller nos permite crear un día de semana:
const createDay = async (day) => {
  const resquest = await Day.findOrCreate({ where: { day: day } });
  return "Se ha creado el día exitosamente";
};

module.exports = {
  getDays,
  createDay,
};
