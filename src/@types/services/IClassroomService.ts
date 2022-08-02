import { Classroom } from "../../models/classroomEntity";
import { ClassroomsDto } from "../dto/ClassroomsDto";

export interface IClassroomService {
  create(classroomsDto: ClassroomsDto): Promise<Classroom>;
  findAll(): Promise<Classroom[]>;
  findOne(id: string): Promise<Classroom>;
  update(id: string, classroomsDto: ClassroomsDto): Promise<Classroom>;
  delete(id: string): Promise<void>;
}
