const { Router } = require("express");
const { validatorCreateComment } = require("../middlewares/validators.js");
const {
  createCommentHandler,
  getCommentsHandler,
  getCommentsUserHandler,
} = require("../handlers/commentHandlers/commentHandlers.js");

// *Acá definimos las rutas de comment:
const commentRouter = Router();

commentRouter.get("/", getCommentsHandler);

commentRouter.get("/userComments", getCommentsUserHandler);

commentRouter.post("/", validatorCreateComment, createCommentHandler);

module.exports = commentRouter;
