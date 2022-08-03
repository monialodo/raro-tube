import { Inject, Service } from "typedi";

import { NotFoundError } from "../@types/errors/NotFoundError";
import { IClassroomRepository } from "../@types/repositories/IClassroomRepository";
import { IClassroomService } from "../@types/services/IClassroomService";
import { Classroom } from "../models/classroomEntity";

@Service("ClassroomService")
export class ClassroomsService implements IClassroomService {
  constructor(
    @Inject("ClassroomRepository")
    private classroomRepository: IClassroomRepository
  ) { }

  async create(classroom: Classroom): Promise<Classroom> {
    return this.classroomRepository.save(classroom);
  }

  async findAll(): Promise<Classroom[]> {
    return this.classroomRepository.find();
  }

  async findOne(id: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne(id);
    if (!classroom) {
      throw new NotFoundError("classroom not found");
    }
    return classroom;
  }

  async update(id: string, classroom: Classroom): Promise<Classroom> {
    return this.classroomRepository.save({ id, ...classroom });
  }

  async delete(id: string): Promise<void> {
    const classroomDelete = await this.classroomRepository.findOne(id);
    if (!classroomDelete) {
      throw new NotFoundError("classroom not found");
    }

    await this.classroomRepository.softDelete(id);
  }
}
