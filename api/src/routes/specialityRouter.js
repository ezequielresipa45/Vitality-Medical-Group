const { Router } = require("express");
const { 
    GET_SPECIALITY,
    POST_SPECIALITY,
    PUT_SPECIALITY,
    DELETE_SPECIALITY} = require('../handlers/specialityHandlers/specialityHandlers')



// *Acá definimos las rutas de especialidades:

const specialityRouter = Router();

specialityRouter.get("/", GET_SPECIALITY)


specialityRouter.post("/", POST_SPECIALITY)


specialityRouter.put("/", PUT_SPECIALITY)


specialityRouter.delete("/", DELETE_SPECIALITY)


module.exports = specialityRouter;
