import { EntityRepository, Repository } from "typeorm";
import { IUserClassroomRepository } from "../@types/repositories/IUserClassroomRepository";
import { UserClassroom } from "../models/userClassroomEntity";

@EntityRepository(UserClassroom)
export class UserClassroomRepository
extends Repository<UserClassroom>
implements IUserClassroomRepository{}