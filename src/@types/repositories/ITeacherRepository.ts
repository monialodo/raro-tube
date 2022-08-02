import { DeleteResult } from "typeorm";

import { Teacher } from "../../models/teacherEntity";
import { TeacherDTO } from "../dto/TeachersDto";

export interface ITeacherRepository {
  find(): Promise<Teacher[]>;
  findOne(id: string): Promise<Teacher>;
  save(teacher: TeacherDTO): Promise<Teacher>;
  delete(id: string): Promise<DeleteResult>;
}
