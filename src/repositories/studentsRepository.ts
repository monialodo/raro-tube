import { Student } from "../models/studentEntity";
import { EntityRepository, Repository } from "typeorm";
import { IStudentRepository } from "../@types/repositories/IStudentRepository";
import { StudentDTO } from "../@types/dto/studentsDTO";


@EntityRepository(Student)
export class StudentRepository extends Repository<Student> implements IStudentRepository {

  async criar(student: Student): Promise<Student> {
    return await this.save(student);
  }

  async atualizar(id: string, student: Partial<StudentDTO>): Promise<Student> {
    return await this.save({ id, ...student});
  }

  async deletar(id: number): Promise<void> {
    await this.softDelete(id);
  }

  async buscarTodos(): Promise<Student[]> {
    return await this.find();
  }
  
  async buscar(id: number): Promise<Student> {
    return this.findOne(id);
  }

  
}