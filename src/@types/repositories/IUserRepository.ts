import { Repository } from "typeorm";

import { User } from "../../models/userEntity";
import { LoginDTO } from "../dto/AuthenticationDto";

export interface IUserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User>;
  findByEmailAndPassword(email, password): Promise<User>;
};
