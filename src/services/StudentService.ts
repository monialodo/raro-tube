import { IStudentRepository } from '../@types/repositories/IStudentRepository';
import { Student } from '../models/studentEntity';
import {Inject, Service} from 'typedi';
import { StudentDTO } from '../@types/dto/studentsDTO';


@Service('StudentsService')
export class StudentsService implements IStudentRepository {
  constructor(
    @Inject('StudentsRepository') private studentRepository: IStudentRepository
  ){}

  async buscarTodos() {
    return await this.studentRepository.buscarTodos();
  }

  async buscar(id: string): Promise<Student> {
    const student = await this.studentRepository.buscar(id);
    if(!student) {
      throw new Error ('Student not found'), 404;
    }
    return student;
  }
  
  async criar(StudentDTO: StudentDTO) {
    return this.studentRepository.criar(StudentDTO);
  }

  async atualizar(id: string, Student: Partial<StudentDTO>): Promise<Student> {
    return await this.studentRepository.atualizar(id, Student);
  }

  async deletar(id: string) {
    const studentDelete = await this.studentRepository.buscar(id);
    if (!studentDelete) {
      throw new Error ('Student not found'), 404;
    }

    await this.studentRepository.deletar(id);
  }

}

