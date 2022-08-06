import { Router } from "express";
import Container from "typedi";

import { ClassroomController } from "../controllers/ClassroomController";
import * as multer from 'multer'
import { classroomRequestDTO } from "../@types/dto/ClassroomsDto";
const router = Router();

const getController = (): ClassroomController => {
  return Container.get<ClassroomController>("ClassroomController");
};

const createClassroomRouter = () => {

  const upload = multer({dest: './uploads'})

  router.get("/", (req, res) => getController().findAll(req, res));
  router.get("/:id", (req, res) => getController().find(req, res));
  router.get("/:id/students", (req, res) => getController().findStudents(req, res));
  router.post("/", upload.single('logo'), (req:classroomRequestDTO, res) => getController().create(req, res));
  router.put("/:id", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().delete(req, res));

  return router;
};

export default createClassroomRouter;
