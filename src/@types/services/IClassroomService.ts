import { Classroom } from "../../models/classroomEntity";
import { User } from "../../models/userEntity";
import { ClassroomsDto } from "../dto/ClassroomsDto";
import { FileDto } from "../dto/FileDto";

export interface IClassroomService {
  create(classroom: ClassroomsDto, file:FileDto): Promise<Classroom>;
  findAll(): Promise<Classroom[]>;
  findOne(id: string): Promise<Classroom>;
  update(id: string, classroomsDto: ClassroomsDto): Promise<Classroom>;
  delete(id: string): Promise<void>;
  findStudents(id:string):Promise<User[]>
}
