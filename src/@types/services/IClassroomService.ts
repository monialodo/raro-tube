import { Classroom } from "../../models/classroomEntity";
import { UserClassroom } from "../../models/userClassroomEntity";
import { ClassroomsDto, EnrollStudentsDTO } from "../dto/ClassroomsDto";


export interface IClassroomService {
  create(classroom: ClassroomsDto, file:Express.Multer.File): Promise<Classroom>;
  findAll(): Promise<Classroom[]>;
  findOne(id: string): Promise<Classroom>;
  update(id: string, classroomsDto: ClassroomsDto): Promise<Classroom>;
  delete(id: string): Promise<void>;
  listStudents(id:string):Promise<UserClassroom[]>
  enrollStudents(userClassroom : EnrollStudentsDTO): Promise<UserClassroom>
}
