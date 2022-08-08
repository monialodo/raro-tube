import { Router } from "express";
import * as multer from 'multer';
import Container from "typedi";
import { classroomRequestDTO } from "../@types/dto/ClassroomsDto";
import { ClassroomController } from "../controllers/ClassroomController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { errorHandler, errorMiddleware } from "../middleware/errorHandler";
import { teacherAuthMiddleware } from "../middleware/teacherAuthMiddleware";
const router = Router();

const getController = (): ClassroomController => {
  return Container.get<ClassroomController>("ClassroomController");
};

const createClassroomRouter = () => {

  const upload = multer({ dest: './uploads' })


  router.get("/",  adminAuthMiddleware, teacherAuthMiddleware, errorMiddleware((req, res) => getController().findAllClassrooms(req, res)));
  router.get("/:id",  errorMiddleware((req, res) => getController().findOne(req, res)));
  router.get("/:id/students",  errorMiddleware((req, res) => getController().enrollStudents(req, res)));
  router.post("/",  adminAuthMiddleware, upload.single('logo'), (req: classroomRequestDTO, res) => getController().create(req, res));
  router.put("/:id",  adminAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id",  adminAuthMiddleware, errorMiddleware((req, res) => getController().delete(req, res)));
  router.post("/students",  errorMiddleware((req, res) => getController().enrollStudents(req, res)));


  return router;
};

export default createClassroomRouter;
