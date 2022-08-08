import { File } from "../../models/fileEntity";
import { UserClassroom } from "../../models/userClassroomEntity";
import { EnrollStudentsDTO } from "../dto/ClassroomsDto";
import { FileDto } from "../dto/FileDto";

export interface IFileService {
  upload(fileDto: FileDto): Promise<File>;
  findAll(): Promise<File[]>;
  download(id: string): Promise<File>;
  update(id: string, fileDTO: FileDto): Promise<File>;
  delete(id: string): Promise<void>;
}