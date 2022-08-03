import { Inject, Service } from "typedi";
import { FileDto } from "../@types/dto/FileDto";
import { IFilesRepository } from "../@types/repositories/IFilesRepository";
import { IFileService } from "../@types/services/IFileService";
import { File } from "../models/fileEntity";

@Service("FileService")
export class FileService implements IFileService {
  constructor(
    @Inject("FileRepository") private fileRepository: IFilesRepository
  ) { }

  async create(fileDto: FileDto): Promise<File> {
    return this.fileRepository.save(fileDto);
  }

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async findOne(id: string): Promise<File> {
    return this.fileRepository.findOne(id);
  }

  async update(id: string, file: File): Promise<File> {
    const foundFile = await this.fileRepository.findOne(id);
    if (!foundFile) {
      throw new Error("File not found");
    }
    return this.fileRepository.save(file);
  }

  async delete(id: string): Promise<void> {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      throw new Error("File not found");
    }
    await this.fileRepository.softDelete(id);
  }






}