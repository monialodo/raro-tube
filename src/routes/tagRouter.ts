import { Router } from "express";
import Container from "typedi";

import { TagController } from "../controllers/TagController";
import { errorMiddleware } from "../middleware/errorHandler";

const router = Router();

const getController = (): TagController => {
  return Container.get<TagController>("TagController");
};

const createTagRouter = () => {
  router.get("/", errorMiddleware((req, res) => getController().findAll(req, res)));
  router.get("/:id", errorMiddleware((req, res) => getController().find(req, res)));
  router.post("/", errorMiddleware((req, res) => getController().create(req, res)));
  router.put("/:id", errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id", errorMiddleware((req, res) => getController().softDelete(req, res)));

  return router;
};

export default createTagRouter;
