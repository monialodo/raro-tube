import { Router } from "express";
import Container from "typedi";

import { StudentController } from "../controllers/StudentController";

const router = Router();

const getController = (): StudentController => {
  return Container.get<StudentController>("StudentController");
};

const createStudentRouter = () => {
  router.get("/", (req, res) => getController().findAll(req, res));
  router.get("/:id", (req, res) => getController().find(req, res));
  router.post("/", (req, res) => getController().create(req, res));
  router.put("/:id", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().delete(req, res));

  return router;
};

export default createStudentRouter;
