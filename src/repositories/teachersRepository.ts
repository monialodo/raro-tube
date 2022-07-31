import { Teacher } from "../models/teacherEntity";
import { EntityRepository, Repository } from "typeorm";
import { ITeacherRepository } from "../@types/repositories/ITeacherRepository";

@EntityRepository(Teacher)
export class TeacherRepository
  extends Repository<Teacher>
  implements ITeacherRepository {}
