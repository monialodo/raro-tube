import { Router } from "express";
import Container from "typedi";

import { FileController } from "../controllers/FileController";
import * as multer from 'multer'


const router = Router();

const getController = (): FileController => {
  return Container.get<FileController>("FileController");
} 

const createRouter = () => {

  const upload = multer({dest: './uploads'})

  router.get("", (req, res) => getController().findAll(req, res));
  router.post("", upload.single('file'),(req, res) => getController().create(req, res));
  router.get("/:id", (req, res) => getController().find(req, res));
  router.put("/:id", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().delete(req, res));

  return router;
}

export default createRouter;