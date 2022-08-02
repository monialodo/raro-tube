import { Teacher } from "../../models/teacherEntity";
import { TeacherDTO } from "../dto/TeachersDto";

export interface ITeacherService {
  findAll(): Promise<Teacher[]>;
  findOne(id: string): Promise<Teacher>;
  create(teacher: TeacherDTO): Promise<Teacher>;
  update(id: string, teacher: TeacherDTO): Promise<Teacher>;
  delete(id: string): Promise<void>;
}
