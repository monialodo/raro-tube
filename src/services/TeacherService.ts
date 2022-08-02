import { Inject, Service } from "typedi";

import { StudentDTO } from "../@types/dto/StudentsDto";
import { IStudentRepository } from "../@types/repositories/IStudentRepository";
import { IStudentService } from "../@types/services/IStudentService";
import { Student } from "../models/studentEntity";

@Service("StudentService")
export class StudentsService implements IStudentService {
  constructor(
    @Inject("StudentRepository") private studentRepository: IStudentRepository
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async create(student: Student): Promise<Student> {
    return this.studentRepository.save(student);
  }

  async delete(id: string): Promise<void> {
    const studentDelete = await this.studentRepository.findOne(id);
    if (!studentDelete) {
      throw new Error("Student not found");
    }

    await this.studentRepository.delete(id);
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne(id);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }

  async update(id: string, student: StudentDTO): Promise<Student> {
    return this.studentRepository.save({ id, ...student });
  }
}
