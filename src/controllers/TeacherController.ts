import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { ITeacherService } from "../@types/services/ITeacherService";

@Service("TeacherController")
export class TeacherController {
  constructor(
    @Inject("TeacherService") private readonly teacherService: ITeacherService
  ) {}

  async findAll(request: Request, response: Response) {
    const teachers = await this.teacherService.findAll();
    response.send(teachers);
  }

  async findOne(request: Request, response: Response) {
    const teacher = await this.teacherService.findOne(request.params.id);
    response.send(teacher);
  }

  async create(request: Request, response: Response) {
    const teacher = await this.teacherService.create(request.body);
    response.status(201).send(teacher);
  }

  async update(request: Request, response: Response) {
    const teacher = await this.teacherService.update(
      request.params.id,
      request.body
    );
    response.send(teacher);
  }

  async delete(request: Request, response: Response) {
    await this.teacherService.delete(request.params.id);
    response.send();
  }
}
