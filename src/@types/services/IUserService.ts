import { UserClassroom } from "../../models/userClassroomEntity";
import { User } from "../../models/userEntity";
import { UserDto } from "../dto/UserDto";

export interface IUserService {
  create(userDTO: UserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  findByLogin(login: string): Promise<User>;
  delete(id: string): Promise<void>;
  getUserClassrooms(userId: string): Promise<UserClassroom[]>;
}
