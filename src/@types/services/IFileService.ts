import { File } from "../../models/fileEntity";
import { FileDto } from "../dto/FileDto";

export interface IFileService {
  create(file: FileDto): Promise<File>;
  findAll(): Promise<File[]>;
  findOne(id: string): Promise<File>;
  update(id: string, fileDTO: FileDto): Promise<File>;
  softDelete(id: string): Promise<void>;
}