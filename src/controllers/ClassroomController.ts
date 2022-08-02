import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { IClassroomService } from "../@types/services/IClassroomService";

@Service("ClassroomController")
export class ClassroomController {
  constructor(
    @Inject("ClassroomService")
    private readonly classroomService: IClassroomService
  ) {}

  async findAll(request: Request, response: Response) {
    const classrooms = await this.classroomService.findAll();
    response.send(classrooms);
  }

  async find(request: Request, response: Response) {
    const classroom = await this.classroomService.findOne(request.params.id);
    response.send(classroom);
  }

  async create(request: Request, response: Response) {
    const classroom = await this.classroomService.create(request.body);
    response.status(201).send(classroom);
  }

  async update(request: Request, response: Response) {
    const classroom = await this.classroomService.update(
      request.params.id,
      request.body
    );
    response.send(classroom);
  }

  async softDelete(request: Request, response: Response) {
    await this.classroomService.delete(request.params.id);
    response.send();
  }
}