import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { classroomRequestDTO, ClassroomsDto } from "../@types/dto/ClassroomsDto";
import { FileDto } from "../@types/dto/FileDto";

import { IClassroomService } from "../@types/services/IClassroomService";
import { IFileService } from "../@types/services/IFileService";
import { fileToInstance } from "../helpers/fileToInstance";

@Service("ClassroomController")
export class ClassroomController {
  constructor(
    @Inject("ClassroomService")
    private readonly classroomService: IClassroomService,
    @Inject("FileService")
    private readonly filesService: IFileService
  ) {}

  async findAll(request: Request, response: Response) {  
    const classrooms = await this.classroomService.findAll();
    response.send(classrooms);
  }

  async find(request: Request, response: Response) {
    const classroom = await this.classroomService.findOne(request.params.id);
    response.send(classroom);
  }

  async create(request: classroomRequestDTO, response: Response) {
    const {file:logo} = request
    const {name,description} = request.body
    const logoInstance = fileToInstance(logo,'png')
    
    const a = await this.filesService.upload(logoInstance)
    
    const classRoomInstance = plainToInstance(ClassroomsDto,{
      name, description,logo: a
    })

    const classroom = await this.classroomService.create(classRoomInstance);
    response.status(201).send(classroom);
  }

  async update(request: Request, response: Response) {
    const classroom = await this.classroomService.update(
      request.params.id,
      request.body
    );
    response.send(classroom);
  }

  async delete(request: Request, response: Response) {
    await this.classroomService.delete(request.params.id);
    response.send();
  }

  async findStudents(request: Request, response: Response){
    throw new Error

  }
}
