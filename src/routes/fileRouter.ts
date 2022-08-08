import { Router } from "express";
import Container from "typedi";

import * as multer from 'multer';
import { FileController } from "../controllers/FileController";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { allUserAuthMiddleware } from "../middleware/allUserAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";


const router = Router();

const getController = (): FileController => {
  return Container.get<FileController>("FileController");
}

const createRouter = () => {

  const upload = multer({ dest: './uploads' })

  router.get("/", adminAuthMiddleware, errorMiddleware((req, res) => getController().findAll(req, res)));
  router.post("/", allUserAuthMiddleware, upload.single('file'), errorMiddleware((req, res) => getController().create(req, res)));
  router.get("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().find(req, res)));
  router.put("/:id", allUserAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id", adminAuthMiddleware, errorMiddleware((req, res) => getController().delete(req, res)));

  return router;
}

export default createRouter;