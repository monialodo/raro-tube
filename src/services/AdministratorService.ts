import { Inject, Service } from "typedi";

import { AdminDTO } from "../@types/dto/AdministratorDto";
import { IAdministratorService } from "../@types/services/IAdministratorService";
import { Administrator } from "../models/administratorEntity";
import { AdministratorRepository } from "../repositories/administratorRepository";

@Service("AdministratorService")
export class AdministratorService implements IAdministratorService {
  constructor(
    @Inject("AdministratorRepository")
    private administratorRepository: AdministratorRepository
  ) {}

  async findAll(): Promise<Administrator[]> {
    return this.administratorRepository.find();
  }

  async create(admin: AdminDTO): Promise<Administrator> {
    return this.administratorRepository.save(admin);
  }
  async delete(id: string): Promise<void> {
    const adm = await this.administratorRepository.findOne(id);
    if (!adm) {
      throw new Error();
    }
    await this.administratorRepository.delete(id);
  }
  async findOne(id: string): Promise<Administrator> {
    const adm = await this.administratorRepository.findOne(id);
    if (!adm) {
      throw new Error();
    }
    return adm;
  }
  async update(id: string, admin: AdminDTO): Promise<Administrator> {
    return this.administratorRepository.save({ id, ...admin });
  }
}
