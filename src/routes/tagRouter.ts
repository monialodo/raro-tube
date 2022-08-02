import { Router } from "express";
import Container from "typedi";

import { TagController } from "../controllers/TagController";

const router = Router();

const getController = (): TagController => {
  return Container.get<TagController>("TagController");
};

const createTagRouter = () => {
  router.get("/", (req, res) => getController().findAll(req, res));
  router.get("/:id", (req, res) => getController().find(req, res));
  router.post("/", (req, res) => getController().create(req, res));
  router.put("/:id", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().delete(req, res));

  return router;
};

export default createTagRouter;