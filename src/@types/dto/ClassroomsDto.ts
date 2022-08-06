import { Classroom } from "../../models/classroomEntity";
import { Request } from "express";

export class ClassroomsDto extends Classroom {}

export interface classroomRequestDTO extends Request{
    file: Express.Multer.File
    body: Classroom
  }