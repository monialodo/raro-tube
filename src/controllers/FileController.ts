import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IFileService } from "../@types/services/IFileService";
import { plainToInstance } from "class-transformer";
import { File } from "../models/fileEntity";


@Service("FileController")
export class FileController {
  constructor(
    @Inject("FileService") private readonly fileService: IFileService
  ) {}

  async create(request:Request, response:Response){
    const {file} = request      

    const fileDto = plainToInstance(File, {
      name: file.originalname,
      path: file.path,
      format: file.mimetype,
      sizeBytes: file.size,
      type: file.fieldname
    })

    const files = await this.fileService.upload(fileDto)
    response.status(201).send(files)

  }

  async findAll(request: Request, response: Response) {
    const files = await this.fileService.findAll();
    response.send(files);
  }

  async find(request: Request, response: Response) {
    const {params: {id}} = request
    
    const file = await this.fileService.download(id);
    
    if(!file){
      response.send(404)
    }
    
    response.setHeader('Content-disposition', `attachment; filename=${file.name}`);
    response.setHeader('Content-Type', file.format);
    response.download(
      file.path,
      file.name
    );

    
  }

  async update(request: Request, response: Response) {
    
    const file = await this.fileService.update(request.params.id, request.body);
    response.send(file);
  }

  async delete(request: Request, response: Response) {
    await this.fileService.delete(request.params.id);
    response.send(200);
  }
}