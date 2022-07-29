import { Inject, Service } from "typedi";
import { IStudentService } from "../@types/services/IStudentService";
import { Request, Response } from "express";

@Service('StudentController')
export class StudentController {
  constructor(
    @Inject('StudentService') private readonly studentService: IStudentService
  ){}

  async buscarTodos(request: Request, response: Response) {
    const students = await this.studentService.findAll();
    console.log(students);
    response.send(students);
  }

  async buscar(request: Request, response: Response) {
    const student = await this.studentService.findOne(request.params.id);
    response.send(student);
  }

  async criar(request: Request, response: Response) {
    const student = await this.studentService.create(request.body);
    response.status(201).send(student);
  }

  async atualizar(request: Request, response: Response) {
    const student = await this.studentService.update(
      request.params.id,
      request.body
    );
    response.send(student);
  }

  async deletar(request: Request, response: Response) {
    await this.studentService.delete(request.params.id);
    response.send();
  }
}