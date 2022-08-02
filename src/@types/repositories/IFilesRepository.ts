import { File } from "../../models/fileEntity";
import { FileDto } from "../dto/FileDto";

export interface IFilesRepository {
  find(): Promise<File[]>;
  findOne(id: string): Promise<File>;
  save(Files: FileDto): Promise<File>;
  delete(id: string): Promise<void>;
}