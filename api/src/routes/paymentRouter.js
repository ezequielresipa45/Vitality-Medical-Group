const { Router } = require("express");
const {
  allPaymentsUserHandler,
  paymentIdHandler,
  createPaymentPlanHandler,
  createPaymentAnalysisHandler,
} = require("../handlers/paymentHandlers/paymentHandlers.js");

const {
  validatorCreatePaymentPlan,
  validatorCreatePaymentAnalysis,
} = require("../middlewares/validators.js");

// *Acá definimos las rutas de payments:
const paymentRouter = Router();

paymentRouter.get("/", allPaymentsUserHandler);

paymentRouter.get("/:id", paymentIdHandler);

paymentRouter.post(
  "/createPaymentPlan",
  validatorCreatePaymentPlan,
  createPaymentPlanHandler
);

paymentRouter.post(
  "/createPaymentAnalysis",
  validatorCreatePaymentAnalysis,
  createPaymentAnalysisHandler
);

module.exports = paymentRouter;
