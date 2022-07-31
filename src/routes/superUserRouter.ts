// noinspection DuplicatedCode

import { Router } from "express";
import { Container } from "typedi";

import { SuperUserController } from "../controllers/SuperUserController";

const router = Router();

const getController = (): SuperUserController => {
  return Container.get<SuperUserController>("SuperUserController");
};

const createSuperUserRouter = () => {
  router.get("/", (req, res) => getController().findAll(req, res));
  router.get("/:id", (req, res) => getController().find(req, res));
  router.post("/", (req, res) => getController().create(req, res));
  router.put("/:id", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().delete(req, res));

  return router;
};

export default createSuperUserRouter;
