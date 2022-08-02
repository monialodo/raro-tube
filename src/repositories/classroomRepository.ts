import { EntityRepository, Repository } from "typeorm";
import { Classroom } from "../models/classroomEntity";

@EntityRepository(Classroom)
export class ClassroomRepository extends Repository<Classroom> {}
