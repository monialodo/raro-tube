import { Router } from "express";
import Container from "typedi";
import { VideoController } from "../controllers/VideoController";

import * as multer from 'multer';
import { videosRequestDTO } from "../@types/dto/VideosDto";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { errorHandler } from "../middleware/errorHandler";
import { teacherAuthMiddleware } from "../middleware/teacherAuthMiddleware";

const router = Router();

const getController = (): VideoController => {
  return Container.get<VideoController>("VideoController");
};

const createVideoRouter = () => {
    const upload = multer({dest: './uploads'})
    
    router.get("", errorHandler, (req, res) => getController().findAll(req, res));
    router.post("", errorHandler, adminAuthMiddleware, teacherAuthMiddleware,  upload.fields([{name:"video", maxCount:1}, {name:"thumbnail", maxCount:1}]),(req:videosRequestDTO, res) => getController().upload(req, res));
    router.get("/:id", errorHandler, (req, res) => getController().find(req, res));
    router.post("/:id/comments",  errorHandler, (req, res) => getController().sendComment(req, res));
    router.get("/:id/comments",  errorHandler, (req, res) => getController().findComments(req, res));
    router.put("/:id", errorHandler, adminAuthMiddleware, teacherAuthMiddleware, (req, res) => getController().update(req, res));
    router.delete("/:id", errorHandler, adminAuthMiddleware, teacherAuthMiddleware, (req, res) => getController().delete(req, res));

  
    return router;
}


export default createVideoRouter