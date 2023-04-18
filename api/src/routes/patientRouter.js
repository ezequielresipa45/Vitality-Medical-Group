const { Router } = require("express");
const {
  validatorCreatePatient,
  validatorUpdatePatient,
} = require("../middlewares/validators.js");

const {
  getPatientsHandler,
  getDniPatientHandler,
  getPatientIdHandler,
  createPatientHandler,
  updatePatientHandler,
  deletePatientHandler,
  getPatientsDeletedHandler,
  recoverPatientHandler,
} = require("../handlers/patientHandlers/patientHandlers.js");


// *Acá definimos las rutas de pacientes:
const patientRouter = Router();

patientRouter.get("/patientsDeleted", getPatientsDeletedHandler);

patientRouter.get("/", getPatientsHandler);

patientRouter.get("/dni", getDniPatientHandler);

patientRouter.get("/:id", getPatientIdHandler);

patientRouter.post("/", validatorCreatePatient, createPatientHandler);

patientRouter.put("/", validatorUpdatePatient, updatePatientHandler);

patientRouter.put("/recoverPatient", recoverPatientHandler);

patientRouter.delete("/:id/delete", deletePatientHandler);

module.exports = patientRouter;
