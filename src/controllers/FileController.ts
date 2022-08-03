import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IFileService } from "../@types/services/IFileService";


@Service("FileController")
export class FileController {
  constructor(
    @Inject("FileService") private readonly fileService: IFileService
  ) {}

  async findAll(request: Request, response: Response) {
    const files = await this.fileService.findAll();
    response.send(files);
  }

  async find(request: Request, response: Response) {
    const file = await this.fileService.findOne(request.params.id);
    response.send(file);
  }

  async create(request: Request, response: Response) {
    const file = await this.fileService.create(request.body);
    response.status(201).send(file);
  }

  async update(request: Request, response: Response) {
    const file = await this.fileService.update(request.params.id, request.body);
    response.send(file);
  }

  async delete(request: Request, response: Response) {
    await this.fileService.delete(request.params.id);
    response.send();
  }
}