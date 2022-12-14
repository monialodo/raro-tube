import { Router } from "express";
import { Container } from "typedi";

import { UserController } from "../controllers/UserController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { adminOrTeacherAuthMiddleware } from "../middleware/adminOrTeacherAuthMiddleware";
import { allUserAuthMiddleware } from "../middleware/allUserAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";

const router = Router();

const getController = (): UserController => {
  return Container.get<UserController>("UserController");
};
const createUserRouter = () => {
  router.get("/", adminOrTeacherAuthMiddleware, errorMiddleware((req, res) => getController().findAll(req, res)));
  router.get("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().find(req, res)));
  router.post("/", adminAuthMiddleware, errorMiddleware((req, res) => getController().create(req, res)));
  router.put("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id", adminAuthMiddleware, errorMiddleware((req, res) => getController().delete(req, res)));

  return router;
};

export default createUserRouter;
