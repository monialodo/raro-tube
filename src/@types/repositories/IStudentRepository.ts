import { Student } from "../../models/studentEntity";
import { StudentDTO } from "../dto/StudentsDto";

export interface IStudentRepository {
  save(student: StudentDTO): Promise<Student>;
  find(): Promise<Student[]>;
  findOne(id: string): Promise<Student>;
  update(id: string, student: Student): Promise<Student>;
  delete(id: string): Promise<void>;
}
