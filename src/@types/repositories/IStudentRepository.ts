import { StudentDTO } from "../dto/StudentsDto";
import { Student } from "../../models/studentEntity";
import { DeleteResult, FindConditions, ObjectID, Repository, UpdateResult } from "typeorm";

export interface IStudentRepository {
  find(): Promise<Student[]>;
  findOne(id: string): Promise<Student>;
  save(student: StudentDTO): Promise<Student>;
  // softDelete(id: string): Promise<UpdateResult>;
  delete(id: string): Promise<DeleteResult>;
}