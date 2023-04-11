const { Router } = require("express");
const {
  getDaysHandler,
  createDayHandler,
} = require("../handlers/dayHandlers/dayHandlers.js");

const dayRouter = Router();

dayRouter.get("/", getDaysHandler);
dayRouter.post("/", createDayHandler);

module.exports = dayRouter;
