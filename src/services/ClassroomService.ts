import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { ClassroomsDto, enrollStudentsDTO } from "../@types/dto/ClassroomsDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { UnauthorizedError } from "../@types/errors/UnauthorizedError";
import { IClassroomRepository } from "../@types/repositories/IClassroomRepository";
import { IUserClassroomRepository } from "../@types/repositories/IUserClassroomRepository";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IClassroomService } from "../@types/services/IClassroomService";
import { IFileService } from "../@types/services/IFileService";
import { fileToInstance } from "../helpers/fileToInstance";
import { Classroom } from "../models/classroomEntity";
import { UserClassroom } from "../models/userClassroomEntity";


@Service("ClassroomService")
export class ClassroomsService implements IClassroomService {
  constructor(
    @Inject("ClassroomRepository")
    private classroomRepository: IClassroomRepository,
    @Inject("UserClassroomRepository")
    private userClassroomRepository: IUserClassroomRepository,
    @Inject("UserRepository")
    private userRepository: IUserRepository,
    @Inject("FileService")
    private readonly filesService: IFileService,
  ) { }

  async create(classroom: ClassroomsDto, file:Express.Multer.File): Promise<Classroom> {
    const {name,description} = classroom

    const logoInstance = await this.filesService.upload(
      fileToInstance(file,'png'))     
      
    const classroomInstance = plainToInstance(ClassroomsDto,{
      name, description,logo: logoInstance
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

  async listStudents(id:string):Promise<UserClassroom[]>{
    
    const classrooms = await this.userClassroomRepository.find({
      where:{classroomId:id},
      relations:['user']
    })

    if(!classrooms){
      throw new NotFoundError("classroom not found");
    }

    return classrooms
  
  }

  async enrollStuddents(userClassroom : enrollStudentsDTO):Promise<UserClassroom>{
     
    const {userId, classroomId} = userClassroom
  
    const userRepo = await this.userRepository.findOne(userId)
    const classroomRepo = await this.classroomRepository.findOne(classroomId)
     
    if(!userRepo || !classroomRepo){
      throw new NotFoundError
    } 

    const student = await this.userClassroomRepository.findOne({
     where:{userId:userRepo.id}
    })

    if(student){
      throw new UnauthorizedError
    }

    const userClassrooms = plainToInstance(UserClassroom, {
      userId:userRepo.id,classroomId:classroomRepo.id,
      userRepo,classroomRepo
    })   
     
    return await this.userClassroomRepository.save(userClassrooms)
  }


}
