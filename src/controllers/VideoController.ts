import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import {  videosRequestDTO } from "../@types/dto/VideosDto";
import { IVideosService } from "../@types/services/IVideosService";

@Service("VideoController")
export class VideoController {
  constructor(
    @Inject("VideoService")
    private readonly videosService: IVideosService
    ) {}

  async findAll(request: Request, response: Response) {
    const Videos = await this.videosService.findAll();
    response.send(Videos);
  }

  async find(request: Request, response: Response) {
    const video = await this.videosService.findOne(request.params.id);

    if(!video){
      response.send(404)
    }
    console.log(video);
    
    response.setHeader('Content-disposition', `attachment; filename=${video.name}`);
    response.setHeader('Content-Type', video.format);
    response.download(
      video.path,
      video.name
    );
  }

  async upload(request: videosRequestDTO, response: Response) {   
    const videos = await this.videosService.upload(request)    
    
    response.status(201).send(videos);
  }

  async update(request: Request, response: Response) {
    const Video = await this.videosService.update(request.params.id, request.body);
    response.send(Video);
  }

  async delete(request: Request, response: Response) {
    await this.videosService.delete(request.params.id);
    response.send();
  }

  async sendComment(request:Request, response:Response){
    
    const {content, userId, videoId} = request.body         
    const commentVideo = this.videosService.sendComment({content,userId,videoId})
    
    response.status(200).send(commentVideo)    
  }

  async findComments(request:Request, response:Response){

    const comments = await this.videosService.findComments(request.params.id)
    response.send(comments) 

  }
}
