import { Inject, Service } from "typedi";
import { IStudentService } from "../@types/services/IStudentService";
import { Request, Response } from "express";

@Service('StudentController')
export class StudentController {
  constructor(
    @Inject('StudentsService') private readonly studentService: IStudentService
  ){}

  async buscarTodos(request: Request, response: Response) {
    const students = await this.studentService.buscarTodos();
    response.send(students);
  }

  async buscar(request: Request, response: Response) {
    const student = await this.studentService.buscar(request.params.id);
    response.send(student);
  }

  async criar(request: Request, response: Response) {
    const student = await this.studentService.criar(request.body);
    response.status(201).send(student);
  }

  async atualizar(request: Request, response: Response) {
    const student = await this.studentService.atualizar(
      request.params.id,
      request.body
    );
    response.send(student);
  }

  async deletar(request: Request, response: Response) {
    await this.studentService.deletar(request.params.id);
    response.send();
  }
}