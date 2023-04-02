const {
  allPayments,
  paymentId,
  createPaymentPlan,
  createPaymentAnalysis,
} = require("../../controllers/paymentControllers/paymentControllers.js");

const allPaymentsUserHandler = async (req, res) => {
  try {
    const { userId } = req.body;
    const request = await allPayments(userId);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const paymentIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await paymentId(id);
    return res.status(200).json(request);
  } catch (error) {
    return res.staus(400).json({ error: error.message });
  }
};

const createPaymentPlanHandler = async (req, res) => {
  try {
    const { user, planId, description, price, code, date } = req.body;
    const request = await createPaymentPlan(
      user,
      planId,
      description,
      price,
      code,
      date
    );
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const createPaymentAnalysisHandler = async (req, res) => {
  try {
    const { ticketsIds, user, description, price, code, date } = req.body;
    const request = await createPaymentAnalysis(
      ticketsIds,
      user,
      description,
      price,
      code,
      date
    );
    return res.status(201).json(request);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  allPaymentsUserHandler,
  paymentIdHandler,
  createPaymentPlanHandler,
  createPaymentAnalysisHandler,
};
