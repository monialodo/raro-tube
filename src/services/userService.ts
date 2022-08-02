import { Inject, Service } from "typedi";

import { NotFoundError } from "../@types/errors/NotFoundError";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IUserService } from "../@types/services/IUserService";
import { User } from "../models/userEntity";

@Service("UserService")
export class UserService implements IUserService {
  constructor(
    @Inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async update(id: string, user: User): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    await this.userRepository.softDelete(id);
  }
}
