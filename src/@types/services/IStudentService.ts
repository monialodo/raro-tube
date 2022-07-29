import { StudentDTO } from "../../@types/dto/studentsDTO";
import { Student } from "../../models/studentEntity";



export interface IStudentService {
  buscarTodos(): Promise<Student[]>;
  buscar(id: string): Promise<Student>;
  criar(StudentDTO: StudentDTO): Promise<Student>;
  atualizar(id: string, Student: Partial<StudentDTO>): Promise<Student>;
  deletar(id: string): Promise<void>;
}