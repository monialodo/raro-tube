import {  plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { FileDto } from "../@types/dto/FileDto";
import { UserDto } from "../@types/dto/UserDto";
import {  videosRequestDTO } from "../@types/dto/VideosDto";
import { IClassroomService } from "../@types/services/IClassroomService";
import { IFileService } from "../@types/services/IFileService";
import { IUserService } from "../@types/services/IUserService";
import { IVideosService } from "../@types/services/IVideosService";
import { Video } from "../models/videoEntity";
import { fileToInstance } from "../helpers/fileToInstance";
import { ICommentService } from "../@types/services/ICommentService";
import { CommentDTO } from "../@types/dto/CommentDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { cp } from "fs";
@Service("VideoController")
export class VideoController {
  constructor(
    @Inject("VideoService")
    private readonly videosService: IVideosService,
    @Inject("FileService")
    private readonly filesService:IFileService,
    @Inject("UserService")
    private readonly usersService:IUserService,
    @Inject("ClassroomService")
    private readonly classroomService: IClassroomService,
    @Inject("CommentService")
    private readonly commentService: ICommentService

  ) {}

  async findAll(request: Request, response: Response) {
    const Videos = await this.videosService.findAll();
    response.send(Videos);
  }

  async find(request: Request, response: Response) {
    const Video = await this.videosService.findOne(request.params.id);
    response.send(Video);
    
  }

  async upload(request: videosRequestDTO, response: Response) {
    
    const {title,description,duration, teacher_id } = request.body
    
    const classroom_id = request.body.classroom_id || null
    const video = request.files.video[0]
    const thumbnail = request.files.thumbnail[0]    
    
    const videoFile = fileToInstance(video, 'video')
    const thumbFile = fileToInstance(thumbnail,'thumbnail')  

    const teacher = await this.usersService.findOne(teacher_id)  
    
    if(!teacher){
      response.send(404)
    }
    
    let classroom = null 
    
    if(classroom_id){
      classroom = await this.classroomService.findOne(classroom_id)
    }
 
    const videoInstance = plainToInstance(Video, {
      title,description,duration, thumbnail:thumbFile,
      video:videoFile, teacher, classroom
      
    })
        
    await this.filesService.upload(thumbFile)
    await this.filesService.upload(videoFile)
    await this.videosService.create(videoInstance)  

    response.status(201).send(videoInstance);
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
    
    const {content} = request.body
    const video = await this.videosService.findOne(request.params.id)
    
    
    //Mock para teste
    const user = await this.usersService.findOne('1faa295d-c0c7-432e-8650-f6f61e014833')
    
    if(!video || !user){
      throw new NotFoundError
    }
    const commentInstance = plainToInstance(CommentDTO, {
      content,video,user
    })

    const commentDto = await this.commentService.create(commentInstance)

    video.comments.push(commentDto)
    
    response.sendStatus(201)

  }

  async findComments(request:Request, response:Response){
    const video = await this.videosService.findOne(request.params.id)

    if(!video){
      throw new NotFoundError
    }

    const comments = video.comments

    response.send(comments) 

  }
}