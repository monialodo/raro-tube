import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { ClassroomsDto } from "../@types/dto/ClassroomsDto";
import { FileDto } from "../@types/dto/FileDto";

import { NotFoundError } from "../@types/errors/NotFoundError";
import { IClassroomRepository } from "../@types/repositories/IClassroomRepository";
import { IClassroomService } from "../@types/services/IClassroomService";
import { Classroom } from "../models/classroomEntity";
import { User } from "../models/userEntity";

@Service("ClassroomService")
export class ClassroomsService implements IClassroomService {
  constructor(
    @Inject("ClassroomRepository")
    private classroomRepository: IClassroomRepository
  ) { }

  async create(classroom: ClassroomsDto, file:FileDto): Promise<Classroom> {
    const {name,description} = classroom

    const classroomInstance = plainToInstance(ClassroomsDto,{
      name, description,logo: file
    })

    return this.classroomRepository.save(classroomInstance);
  }

  async findAll(): Promise<Classroom[]> {
    return this.classroomRepository.find({relations: ['logo']});
  }

  async findOne(id: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne({where:{id},relations:['logo']});
    if (!classroom) {
      throw new NotFoundError("Classroom not found");
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

  //Para fazer
  async findStudents(id:string):Promise<User[]>{
    const classroom = await this.classroomRepository.findOne(
      {where:{id} }
    )

    if(!classroom){
      throw new NotFoundError("classroom not found");
    }
    console.log(classroom);
    return
    
  }


}
