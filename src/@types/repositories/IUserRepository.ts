import { Repository } from "typeorm";

import { User } from "../../models/userEntity";
import { LoginDto } from "../dto/AuthDto";
export interface IUserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User>;
  findByEmailAndPassword(loginData: LoginDto): Promise<User>;
};
