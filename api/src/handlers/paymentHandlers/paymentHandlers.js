const {
  allPayments,
  paymentId,
  createPaymentAnalysis,
  createPaymentPlan,
} = require("../../controllers/paymentControllers/paymentControllers.js");

const allPaymentsHandler = async (req, res) => {
  try {
    const { idUser } = req.body;
    const request = await allPayments(idUser);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const paymentIdHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const request = await paymentId(id);
    return res.status(200).json(request);
  } catch (error) {
    return res.staus(400).json({ error: error.message });
  }
};

const createPaymentAnalysisHandler = async (req, res) => {
  try {
    const { user, tickets, detail } = req.body;
    const request = await createPaymentAnalysis(user, tickets, detail);
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const createPaymentPlanHandler = async (req, res) => {
  try {
    const { user, plan, detail } = req.body;
    const request = await createPaymentPlan(user, plan, detail);
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  allPaymentsHandler,
  paymentIdHandler,
  createPaymentAnalysisHandler,
  createPaymentPlanHandler,
};
