const { Router } = require("express")
const { Login, SignUp } = require("../handlers/loginHandlers/loginHandlers")
const jwtCheck = require("../middlewares/auth.js")

const loginRouter = Router();

loginRouter.get("/", jwtCheck, Login);
loginRouter.put("/", jwtCheck, SignUp)

module.exports = loginRouter;