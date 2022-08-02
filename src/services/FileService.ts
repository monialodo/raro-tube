import { Inject, Service } from "typedi";

import { FileDto } from "../@types/dto/FileDto";
import { IFileService } from "../@types/services/IFileService";
import { FilesRepository } from "../repositories/filesRepository";


@Service("FileService")
export class FileService implements IFileService {
  constructor(
    @Inject("FileRepository") private fileRepository: FilesRepository
  ) {}

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async create(file: File): Promise<File> {
    return this.fileRepository.save(file);
  }

  async delete(id: string): Promise<void> {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      throw new Error();
    }
    await this.fileRepository.delete(id);
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      throw new Error();
    }
    return file;
  }

  async update(id: string, file: FileDto): Promise<File> {
    return this.fileRepository.save({ id, ...file });
  }

}