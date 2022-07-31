import { Inject, Service } from "typedi";

import { SuperUserDTO } from "../@types/dto/SuperUserDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { ISuperUserRepository } from "../@types/repositories/ISuperUserRepository";
import { ISuperUserService } from "../@types/services/ISuperUserService";
import { SuperUser } from "../models/superUserEntity";

@Service("SuperUserService")
export class SuperUserService implements ISuperUserService {
  constructor(
    @Inject("SuperUserRepository")
    private superUserRepository: ISuperUserRepository
  ) {}

  async create(superUser: SuperUser): Promise<SuperUser> {
    return this.superUserRepository.save(superUser);
  }

  async findAll(): Promise<SuperUser[]> {
    return this.superUserRepository.find();
  }

  async findOne(id: string): Promise<SuperUser> {
    const superUser = await this.superUserRepository.findOne(id);
    if (!superUser) {
      throw new NotFoundError("SuperUser not found");
    }
    return superUser;
  }

  async update(id: string, superUserDTO: SuperUserDTO): Promise<SuperUser> {
    return this.superUserRepository.update(id, superUserDTO);
  }

  async delete(id: string): Promise<void> {
    const superUser = await this.superUserRepository.findOne(id);
    if (!superUser) {
      throw new NotFoundError("SuperUser not found");
    }
    await this.superUserRepository.delete(id);
  }
}
