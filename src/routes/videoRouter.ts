import { Router } from "express";
import Container from "typedi";
import { VideoController } from "../controllers/VideoController";

import * as multer from 'multer';
import { videosRequestDTO } from "../@types/dto/VideosDto";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { teacherAuthMiddleware } from "../middleware/teacherAuthMiddleware";
import { errorMiddleware } from "../middleware/errorHandler";

const router = Router();

const getController = (): VideoController => {
  return Container.get<VideoController>("VideoController");
};

const createVideoRouter = () => {
    const upload = multer({dest: './uploads'})
    
    router.get("", errorMiddleware((req, res) => getController().findAll(req, res)));
    router.post("", adminAuthMiddleware,
      teacherAuthMiddleware,
      upload.fields([{name:"video", maxCount:1}, {name:"thumbnail", maxCount:1}]),
      errorMiddleware((req:videosRequestDTO, res) => getController().upload(req, res)));
    router.get("/:id", errorMiddleware((req, res) => getController().find(req, res)));
    router.post("/:id/comments", errorMiddleware((req, res) => getController().sendComment(req, res)));
    router.get("/:id/comments", errorMiddleware((req, res) => getController().findComments(req, res)));
    router.put("/:id", adminAuthMiddleware, teacherAuthMiddleware, errorMiddleware((req, res) => getController().update(req, res)));
    router.delete("/:id", adminAuthMiddleware, teacherAuthMiddleware, errorMiddleware((req, res) => getController().delete(req, res)));

  
    return router;
}


export default createVideoRouter