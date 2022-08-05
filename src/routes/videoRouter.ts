import { Router } from "express";
import Container from "typedi";
import { VideoController } from "../controllers/VideoController";

import * as multer from 'multer'
import { videosRequestDTO } from "../@types/dto/VideosDto";

const router = Router();

const getController = (): VideoController => {
  return Container.get<VideoController>("VideoController");
};

const createVideoRouter = () => {
    const upload = multer({dest: './uploads'})
    
    router.get("", (req, res) => getController().findAll(req, res));
    router.post("", upload.fields([{name:"video", maxCount:1}, {name:"thumbnail", maxCount:1}]),(req:videosRequestDTO, res) => getController().upload(req, res));
    router.get("/:id", (req, res) => getController().find(req, res));
    router.put("/:id", (req, res) => getController().update(req, res));
    router.delete("/:id", (req, res) => getController().delete(req, res));
  
    return router;
}


export default createVideoRouter