import { StudentDTO } from "../../@types/dto/studentsDTO";
import { Student } from "../../models/studentEntity";

export interface IStudentRepository {
    criar(student: Student): Promise<Student>;
    atualizar(id: string, student: Partial<StudentDTO>): Promise<Student>;
    deletar(id: string): Promise<void>;
    buscarTodos(): Promise<Student[]>;
    buscar(id: string): Promise<Student>;
}