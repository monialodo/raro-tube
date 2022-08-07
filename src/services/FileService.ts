import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { FileDto, UploadFileDto } from "../@types/dto/FileDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { IFilesRepository } from "../@types/repositories/IFilesRepository";
import { IFileService } from "../@types/services/IFileService";
import { File } from "../models/fileEntity";

@Service("FileService")
export class FileService implements IFileService {
  constructor(
    @Inject("FileRepository") private fileRepository: IFilesRepository
  ) { }

  async upload(file: UploadFileDto): Promise<File> {
    return this.fileRepository.save(plainToInstance(File, file));
  }

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async download(id: string): Promise<File> {
    const file = await this.fileRepository.findOne(id)
    if (!file) {
      throw new NotFoundError("File not found");
    }
    return file;
  }

  async update(id: string, file: FileDto): Promise<File> {
    
    const foundFile = await this.fileRepository.findOne(id);
    if (!foundFile) {
      throw new NotFoundError("File not found");
    }
    return this.fileRepository.save({id, ...file})
  }

  async delete(id: string): Promise<void> {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      throw new NotFoundError("File not found");
    }
    await this.fileRepository.softDelete(id);
  }






}