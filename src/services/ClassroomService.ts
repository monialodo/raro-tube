import { Inject, Service } from "typedi";

import { ClassroomsDto } from "../@types/dto/ClassroomsDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { IClassroomRepository } from "../@types/repositories/IClassroomRepository";
import { IClassroomService } from "../@types/services/IClassroomService";
import { Classroom } from "../models/classroomEntity";


@Service("ClassroomService")
export class ClassroomsService implements IClassroomService {
  constructor(
    @Inject("ClassroomRepository")
    private ClassroomRepository: IClassroomRepository
  ) {}

  async create(classroom: ClassroomsDto): Promise<Classroom> {
    return this.ClassroomRepository.save(classroom);
  }

  async findAll(): Promise<Classroom[]> {
    return this.ClassroomRepository.find();
  }

  async findOne(id: string): Promise<Classroom> {
    const classroom = await this.ClassroomRepository.findOne(id);
    if (!classroom) {
      throw new NotFoundError("classroom not found");
    }
    return classroom;
  }

  async update(id: string, classroom: ClassroomsDto): Promise<Classroom> {
    return this.ClassroomRepository.save({ id, ...classroom });
  }

  async delete(id: string): Promise<void> {
    const classroomDelete = await this.ClassroomRepository.findOne(id);
    if (!classroomDelete) {
      throw new NotFoundError("classroom not found");
    }

    await this.ClassroomRepository.delete(id);
  }
}