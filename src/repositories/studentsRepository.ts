import { EntityRepository, Repository } from "typeorm";

import { Student } from "../models/studentEntity";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {}
