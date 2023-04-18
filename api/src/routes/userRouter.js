const { Router } = require("express");
const {
  GET_USER,
  GET_USER_ID,
  POST_USER,
  PUT_ISADMIN,
  DELETE_USER,
  PUT_USER,
} = require("../handlers/userHandlers/userHandlers");

const { validatorCreateUser } = require("../middlewares/validators.js");

// *Acá definimos las rutas de usuarios:

const userRouter = Router();

userRouter.get("/", GET_USER);

userRouter.get("/:id", GET_USER_ID);

userRouter.post("/", validatorCreateUser, POST_USER);

userRouter.put("/", PUT_USER);

userRouter.put("/isAdmin", PUT_ISADMIN);

userRouter.delete("/:id", DELETE_USER);

module.exports = userRouter;
