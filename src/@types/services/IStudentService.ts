import { Student } from "../../models/studentEntity";
import { StudentDTO } from "../dto/StudentsDto";

export interface IStudentService {
  findAll(): Promise<Student[]>;
  findOne(id: string): Promise<Student>;
  create(student: StudentDTO): Promise<Student>;
  update(id: string, student: StudentDTO): Promise<Student>;
  delete(id: string): Promise<void>;
}