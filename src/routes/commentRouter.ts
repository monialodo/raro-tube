import { Router } from "express";
import Container from "typedi";

import { CommentController } from "../controllers/CommentController";
import { adminOrTeacherAuthMiddleware } from "../middleware/adminOrTeacherAuthMiddleware";
import { allUserAuthMiddleware } from "../middleware/allUserAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";

const router = Router();

const getController = (): CommentController => {
  return Container.get<CommentController>("CommentController");
};

const createCommentRouter = () => {
  router.get("/", allUserAuthMiddleware, errorMiddleware((req, res) => getController().findAll(req, res)));
  router.post("/", allUserAuthMiddleware, errorMiddleware((req, res) => getController().create(req, res)));
  router.get("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().find(req, res)));
  router.put("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
  router.patch("/:id/vote", allUserAuthMiddleware, errorMiddleware((req, res) => getController().patchVote(req, res)));
  router.get("/:id/user", allUserAuthMiddleware, errorMiddleware((req, res) => getController().findUserComment(req, res)));
  router.delete("/:id", adminOrTeacherAuthMiddleware, errorMiddleware((req, res) => getController().delete(req, res)));
  router.get("/:id/isItMine", allUserAuthMiddleware, (req, res) => getController().isItMineComment(req, res));

  return router;
};

export default createCommentRouter;
