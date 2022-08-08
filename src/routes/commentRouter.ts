import { Router } from "express";
import Container from "typedi";

import { CommentController } from "../controllers/CommentController";
import { errorMiddleware } from "../middleware/errorHandler";

const router = Router();

const getController = (): CommentController => {
  return Container.get<CommentController>("CommentController");
};

const createCommentRouter = () => {
  router.get("", errorMiddleware((req, res) => getController().findAll(req, res)));
  router.post("", errorMiddleware((req, res) => getController().create(req, res)));
  router.get("/:id", errorMiddleware((req, res) => getController().find(req, res)));
  router.put("/:id", errorMiddleware((req, res) => getController().update(req, res)));
  router.patch("/:id/upvote", errorMiddleware((req, res) => getController().patchUpvote(req, res)));
  router.patch("/:id/downvote", errorMiddleware((req, res) => getController().patchDownvote(req, res)));
  router.get("/:id/user", errorMiddleware((req, res) => getController().findUserComment(req, res)));
  router.delete("/:id", errorMiddleware((req, res) => getController().delete(req, res)));

  return router;
};

export default createCommentRouter;
