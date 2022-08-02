import { EntityRepository, Repository } from "typeorm";

import { IClassroomRepository } from "../@types/repositories/IClassroomRepository";
import { Classroom } from "../models/classroomEntity";

@EntityRepository(Classroom)
export class ClassroomRepository
  extends Repository<Classroom>
  implements IClassroomRepository {}
