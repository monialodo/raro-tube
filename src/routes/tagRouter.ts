import { Router } from "express";
import Container from "typedi";

import { TagController } from "../controllers/TagController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";

const router = Router();

const getController = (): TagController => {
  return Container.get<TagController>("TagController");
};

const createTagRouter = () => {
  router.get("/", adminAuthMiddleware, errorMiddleware((req, res) => getController().findAll(req, res)));
  router.get("/:id", adminAuthMiddleware, errorMiddleware((req, res) => getController().find(req, res)));
  router.post("/", adminAuthMiddleware, errorMiddleware((req, res) => getController().create(req, res)));
  router.put("/:id", adminAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id", adminAuthMiddleware, errorMiddleware((req, res) => getController().softDelete(req, res)));

  return router;
};

export default createTagRouter;
