import { Router } from "express";
import * as multer from 'multer';
import Container from "typedi";
import { ClassroomRequestDTO } from "../@types/dto/ClassroomsDto";
import { ClassroomController } from "../controllers/ClassroomController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";
import { adminOrTeacherAuthMiddleware } from "../middleware/adminOrTeacherAuthMiddleware";
import { allUserAuthMiddleware } from "../middleware/allUserAuthMiddleware";
const router = Router();

const getController = (): ClassroomController => {
  return Container.get<ClassroomController>("ClassroomController");
};

const createClassroomRouter = () => {

  const upload = multer({ dest: './uploads' })


  router.get("/",  adminOrTeacherAuthMiddleware, errorMiddleware((req, res) => getController().findAllClassrooms(req, res)));
  router.get("/:id", allUserAuthMiddleware,  errorMiddleware((req, res) => getController().findOne(req, res)));
  router.get("/:id/students", adminOrTeacherAuthMiddleware, errorMiddleware((req, res) => getController().enrollStudents(req, res)));
  router.post("/",  adminAuthMiddleware, upload.single('logo'), (req: ClassroomRequestDTO, res) => getController().create(req, res));
  router.put("/:id",  adminAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id",  adminAuthMiddleware, errorMiddleware((req, res) => getController().delete(req, res)));
  router.post("/students", allUserAuthMiddleware,  errorMiddleware((req, res) => getController().enrollStudents(req, res)));


  return router;
};

export default createClassroomRouter;
