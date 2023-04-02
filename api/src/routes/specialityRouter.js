const { Router } = require("express");
const {
  GET_SPECIALITY,
  POST_SPECIALITY,
  PUT_SPECIALITY,
  DELETE_SPECIALITY,
} = require("../handlers/specialityHandlers/specialityHandlers");

const { validatorCreateSpeciality } = require("../middlewares/validators.js");

// *Acá definimos las rutas de especialidades:

const specialityRouter = Router();

specialityRouter.get("/", GET_SPECIALITY);

specialityRouter.post("/", validatorCreateSpeciality, POST_SPECIALITY);

specialityRouter.put("/", PUT_SPECIALITY);

specialityRouter.delete("/:id", DELETE_SPECIALITY);

module.exports = specialityRouter;
