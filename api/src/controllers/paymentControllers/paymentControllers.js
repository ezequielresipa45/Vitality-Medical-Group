const { Paids, Plan, User, Payment, TicketAnalysis } = require("../../db.js");

const createPaymentPlan = async (
  user,
  planId,
  description,
  price,
  code,
  date
) => {
  const requestUser = await User.findByPk(user); //?Correcto
  await requestUser.set({
    is_plan_pay: true,
  });
  await requestUser.save();

  const requestPlan = await Plan.findByPk(planId);
  await requestPlan.addUser(requestUser); //?Correcto
  await requestPlan.save();

  const requestPayment = await Payment.create({
    description,
    price,
    code,
  });
  await requestUser.addPayment(requestPayment); //?Correcto
  await requestUser.save();

  const requestPaids = await Paids.create({
    description,
    price,
    date,
  });
  await requestUser.addPaids(requestPaids); //?Correcto
  await requestUser.save();

  await requestPlan.addPaids(requestPaids); //?Correcto
  await requestPlan.save();

  await requestPayment.addPaids(requestPaids); //?Correcto
  await requestPayment.save();

  return "El pago del plan se ha realizado con éxito";
};

const createPaymentAnalysis = async (
  ticketsIds,
  user,
  description,
  price,
  code,
  date
) => {
  const requestUser = await User.findByPk(user);
  const requestPayment = await Payment.create({
    description,
    price,
    code,
  });
  const requestPaids = await Paids.create({
    description,
    price,
    date,
  });

  const requestTickets = await TicketAnalysis.findAll({
    where: { id: ticketsIds },
  });
  await requestTickets.forEach(function (item) {
    item.is_paid = true;
    item.save();
  });

  await requestPayment.addTicketAnalysis(requestTickets); //?Correcto
  await requestPayment.save();

  await requestUser.addPaids(requestPaids); //?Correcto
  await requestUser.save();

  await requestPayment.addPaids(requestPaids); //?Correcto
  await requestPayment.save();

  await requestUser.addPayment(requestPayment); //?Correcto
  await requestUser.save();
  return "El pago del análisis se ha realizado con éxito";
};

const allPayments = async (userId) => {
  const payments = await Payment.findAll({
    where: {
      userId: userId,
    },
  });
  return payments;
};

const paymentId = async (id) => {
  const pay = await Payment.findByPk(id);
  return pay;
};

module.exports = {
  allPayments,
  paymentId,
  createPaymentPlan,
  createPaymentAnalysis,
};
