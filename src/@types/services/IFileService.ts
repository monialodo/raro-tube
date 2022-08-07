import { File } from "../../models/fileEntity";
import { FileDto, UploadFileDto } from "../dto/FileDto";

export interface IFileService {
  upload(fileDto: UploadFileDto): Promise<File>;
  findAll(): Promise<File[]>;
  download(id: string): Promise<File>;
  update(id: string, fileDTO: FileDto): Promise<File>;
  delete(id: string): Promise<void>;
}