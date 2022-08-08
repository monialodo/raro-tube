import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { ClassroomsDto, EnrollStudentsDTO } from "../@types/dto/ClassroomsDto";
import { ForbiddenError } from "../@types/errors/ForbiddenError";

import { NotFoundError } from "../@types/errors/NotFoundError";
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
    private readonly filesService: IFileService
  ) {}

  async create(
    classroom: ClassroomsDto,
    file: Express.Multer.File
  ): Promise<Classroom> {
    const { name, description } = classroom;

    const logoInstance = await this.filesService.upload(
      fileToInstance(file, "png")
    );

    const classroomInstance = plainToInstance(ClassroomsDto, {
      name,
      description,
      logo: logoInstance,
    });

    return this.classroomRepository.save(classroomInstance);
  }

  async findAll(): Promise<Classroom[]> {
    return this.classroomRepository.find({ relations: ["logo"] });
  }

  async findOne(id: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne({
      where: { id },
      relations: ["logo"],
    });
    if (!classroom) {
      throw new NotFoundError("Classroom not found");
    }
    return classroom;
  }

  async update(id: string, classroomData: Classroom): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne(id);
    if (!classroom) {
      throw new NotFoundError("classroom not found");
    }
    return this.classroomRepository.save({ id, ...classroomData });
  }

  async delete(id: string): Promise<void> {
    const classroomDelete = await this.classroomRepository.findOne(id);
    if (!classroomDelete) {
      throw new NotFoundError("classroom not found");
    }
    await this.classroomRepository.softDelete(id);
  }

  async listStudents(id: string): Promise<UserClassroom[]> {
    const classrooms = await this.userClassroomRepository.find({
      where: { classroomId: id },
      relations: ["user"],
    });

    if (!classrooms) {
      throw new NotFoundError("classroom not found");
    }

    return classrooms;
  }

  async enrollStudents(
    userClassroom: EnrollStudentsDTO
  ): Promise<UserClassroom> {
    const { userId, classroomId } = userClassroom;

    const user = await this.userRepository.findOne(userId);
    const classroom = await this.classroomRepository.findOne(classroomId);

    if (!user || !classroom) {
      throw new NotFoundError("user or classroom not found");
    }

    const enrolled = await this.userClassroomRepository.findOne({
      where: { userId: user.id, classroomId: classroom.id },
    });

    if (enrolled) {
      throw new ForbiddenError("Student already enrolled in this classroom");
    }

    const userClassrooms = plainToInstance(UserClassroom, {
      userId: user.id,
      classroomId: classroom.id,
      user,
      classroom,
    });

    return await this.userClassroomRepository.save(userClassrooms);
  }
}
