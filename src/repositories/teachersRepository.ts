import { EntityRepository, Repository } from "typeorm";

import { ITeacherRepository } from "../@types/repositories/ITeacherRepository";
import { Teacher } from "../models/teacherEntity";

@EntityRepository(Teacher)
export class TeacherRepository
  extends Repository<Teacher>
  implements ITeacherRepository {}
