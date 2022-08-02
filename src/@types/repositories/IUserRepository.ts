import { User } from "../../models/userEntity";
import { UserDto } from "../dto/UserDto";

export interface IUserRepository {
  save(user: UserDto): Promise<User>;
  find(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
  softDelete(id: string): Promise<void>;
}
