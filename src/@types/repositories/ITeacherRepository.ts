import { TeacherDTO } from "../dto/TeachersDto";
import { Teacher } from "../../models/teacherEntity";
import { DeleteResult, FindConditions, ObjectID, Repository, UpdateResult } from "typeorm";

export interface ITeacherRepository {
  find(): Promise<Teacher[]>;
  findOne(id: string): Promise<Teacher>;
  save(teacher: TeacherDTO): Promise<Teacher>;
  delete(id: string): Promise<DeleteResult>;
}