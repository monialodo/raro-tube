import { Classroom } from "../../models/classroomEntity";
import { ClassroomsDto } from "../dto/ClassroomsDto";

export interface IClassroomRepository {
  save(Classroom: ClassroomsDto): Promise<Classroom>;
  find(): Promise<Classroom[]>;
  findOne(id: string): Promise<Classroom>;
  update(id: string, Classroom: Classroom): Promise<Classroom>;
  delete(id: string): Promise<void>;
}
