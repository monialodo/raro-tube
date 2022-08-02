import { User } from "../../models/userEntity";
import { UserDto } from "../dto/UserDto";

export interface IUserService {
  create(userDTO: UserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  update(id: string, userDTO: UserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
