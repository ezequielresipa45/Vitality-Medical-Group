const { Router } = require("express");
const {GET_USER,
    POST_USER,
    PUT_ISADMIN,
    DELETE_USER} = require('../handlers/userHandlers/userHandlers')


// *Acá definimos las rutas de usuarios:

const userRouter = Router();

userRouter.get('/', GET_USER)

userRouter.post('/', POST_USER)

userRouter.put('/isAdmin', PUT_ISADMIN)

userRouter.delete('/', DELETE_USER)

// !POR DEFINIR...

module.exports = userRouter;
