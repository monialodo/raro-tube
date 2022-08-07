import { Classroom } from "../../models/classroomEntity";
import { UserClassroom } from "../../models/userClassroomEntity";
import { User } from "../../models/userEntity";
import { ClassroomsDto, enrollStudentsDTO, userClassroomDto } from "../dto/ClassroomsDto";


export interface IClassroomService {
  create(classroom: ClassroomsDto, file:Express.Multer.File): Promise<Classroom>;
  findAll(): Promise<Classroom[]>;
  findOne(id: string): Promise<Classroom>;
  update(id: string, classroomsDto: ClassroomsDto): Promise<Classroom>;
  delete(id: string): Promise<void>;
  listStudents(id:string):Promise<UserClassroom[]>
  enrollStuddents(userClassroom : enrollStudentsDTO): Promise<UserClassroom>
}
