import { Router } from "express";
import Container from "typedi";

import { TeacherController } from "../controllers/TeacherController";

const router = Router();

const getController = (): TeacherController => {
  return Container.get<TeacherController>("TeacherController");
};

const createTeacherRouter = () => {
  router.get("/", (req, res) => getController().findAll(req, res));
  router.get("/:id", (req, res) => getController().findOne(req, res));
  router.post("/", (req, res) => getController().create(req, res));
  router.put("/:id", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().delete(req, res));

  return router;
};

export default createTeacherRouter;
