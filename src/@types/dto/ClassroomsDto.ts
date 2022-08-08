import { Classroom } from "../../models/classroomEntity";
import { Request } from "express";
import { User } from "../../models/userEntity";

export class ClassroomsDto extends Classroom {}

export class userClassroomDto {
  user : User
  classroom:Classroom
}

export interface CreateClassroomDto {
  name: string;
  description: string;
}

export interface ClassroomRequestDTO extends Request{
    file: Express.Multer.File
    body: Classroom
}

export interface EnrollStudentsDTO{
  userId: string
  classroomId:string
}