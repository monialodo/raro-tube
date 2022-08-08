import { Router } from "express";
import Container from "typedi";

import { FileController } from "../controllers/FileController";
import * as multer from 'multer'
import { errorMiddleware } from "../middleware/errorHandler";


const router = Router();

const getController = (): FileController => {
  return Container.get<FileController>("FileController");
}

const createRouter = () => {

  const upload = multer({dest: './uploads'})

  router.get("", errorMiddleware((req, res) => getController().findAll(req, res)));
  router.post("", upload.single('file'), errorMiddleware((req, res) => getController().create(req, res)));
  router.get("/:id", errorMiddleware((req, res) => getController().find(req, res)));
  router.put("/:id", errorMiddleware((req, res) => getController().update(req, res)));
  router.delete("/:id", errorMiddleware((req, res) => getController().delete(req, res)));

  return router;
}

export default createRouter;