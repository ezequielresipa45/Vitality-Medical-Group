const { Router } = require("express");
const {
  allPaymentsHandler,
  paymentIdHandler,
  createPaymentAnalysisHandler,
  createPaymentPlanHandler,
} = require("../handlers/paymentHandlers/paymentHandlers.js");

// *Acá definimos las rutas de payments:
const paymentRouter = Router();

// paymentRouter.get("/", allPaymentsHandler);

// paymentRouter.get("/:id", paymentIdHandler);

// paymentRouter.post("/createPaymentAnalysis", createPaymentAnalysisHandler);

// paymentRouter.post("/createPaymentPlan", createPaymentPlanHandler);

module.exports = paymentRouter;
