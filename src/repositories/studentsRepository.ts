import { Student } from "../models/studentEntity";
import { EntityRepository, Repository } from "typeorm";
import { IStudentRepository } from "../@types/repositories/IStudentRepository";


@EntityRepository(Student)
export class StudentRepository
extends Repository<Student>
implements IStudentRepository {
}