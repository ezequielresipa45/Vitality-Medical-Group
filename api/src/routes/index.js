const { Router } = require("express");
// Importar todos los routers;
const patientRouter = require("./patientRouter.js");
const doctorRouter = require("./doctorRouter.js");
const ticketMedicalRouter = require("./ticketMedicalRouter.js");
const paidsRouter = require("./paidsRouter.js")
const paymentRouter = require("./paymentRouter.js")
const planRouter = require("./planRouter.js")
const specialityRouter = require("./specialityRouter.js")
const ticketAnalysisRouter = require("./ticketAnalysisRouter.js")
const userRouter = require("./userRouter.js")

const router = Router();

// *Configurar los routers:
router.use("/doctor", doctorRouter);
router.use("/paid", paidsRouter)
router.use("/patient", patientRouter);
router.use("/ticketMedical", ticketMedicalRouter);
router.use("/payment", paymentRouter)
router.use("/plan", planRouter)
router.use("/speciality", specialityRouter)
router.use("/analysis", ticketAnalysisRouter)
router.use("/user", userRouter)

module.exports = router;
