import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { classroomRequestDTO, ClassroomsDto, enrollStudentsDTO } from "../@types/dto/ClassroomsDto";
import { TypedRequestBody } from "../@types/dto/Request";


import { IClassroomService } from "../@types/services/IClassroomService";


@Service("ClassroomController")
export class ClassroomController {
  constructor(
    @Inject("ClassroomService")
    private readonly classroomService: IClassroomService
  ) {}

  async findAllClassrooms(request: Request, response: Response) {  
    const classrooms = await this.classroomService.findAll();
    response.send(classrooms);
  }

  async findOne(request: Request, response: Response) {
    const classroom = await this.classroomService.findOne(request.params.id);
    response.send(classroom);
  }

  async create(request: classroomRequestDTO, response: Response) {
    const {file:logo} = request

    const classroom = await this.classroomService.create(request.body,logo);
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

  async enrollStudents(request: TypedRequestBody<enrollStudentsDTO>, response: Response){

    const {userId,classroomId} = request.body  
    const userClassroom = await this.classroomService.enrollStuddents({userId,classroomId})
    
    response.send(userClassroom)

  }

  async listStudents(request: Request, response: Response){
        
    const students = await this.classroomService.listStudents(request.params.id)

    response.send(students)

  }
}
