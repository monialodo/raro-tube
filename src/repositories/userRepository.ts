import { EntityRepository, Repository } from "typeorm";
import { LoginDTO } from "../@types/dto/AuthenticationDto";

import { IUserRepository } from "../@types/repositories/IUserRepository";
import { User } from "../models/userEntity";

@EntityRepository(User)
export class UserRepository
  extends Repository<User>

  implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email,
      },
    })
  }

  async findByEmailAndPassword(loginData: LoginDTO): Promise<User> {
    const { email, password } = loginData;
    return this.findOne({
      where: {
        email,
        password,
      },
    })
  }
}
