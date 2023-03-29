const { Router } = require("express");
const { 
    GET_ANALYSIS,
    POST_ANALYSIS,
    PUT_ANALYSIS,
    DELETE_ANALYSIS} = require('../handlers/analysisHandlers/analysisHandlers');



// *Acá definimos las rutas de especialidades:

const analysisRouter = Router();

analysisRouter.get("/", GET_ANALYSIS)


analysisRouter.post("/", POST_ANALYSIS)


analysisRouter.put("/", PUT_ANALYSIS)


analysisRouter.delete("/", DELETE_ANALYSIS)


module.exports = analysisRouter;
