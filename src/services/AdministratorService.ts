import { IAdministratorService } from "../@types/services/IAdministratorService";
import { Administrator } from "../models/administratorEntity";
import { Inject, Service } from "typedi";
import { AdminDTO } from '../@types/dto/AdministratorDto'
import { AdministratorRepository } from "../repositories/AdministratorRepository";

@Service('AdministratorService')
export class AdministratorService implements IAdministratorService {

    constructor(@Inject('AdministratorRepository')
    private AdministratorRepository: AdministratorRepository) { }

    async findAll(): Promise<Administrator[]> {
        return await this.AdministratorRepository.find()
    }

    async create(admin: AdminDTO): Promise<Administrator> {
        return this.AdministratorRepository.save(admin)
    }
    async delete(id: string): Promise<void> {
        const adm = await this.AdministratorRepository.findOne(id)
        if (!adm) {
            throw new Error
        }
        await this.AdministratorRepository.delete(id)
    }
    async findOne(id: string): Promise<Administrator> {
        const adm = await this.AdministratorRepository.findOne(id)
        if (!adm) {
            throw new Error
        }
        return adm
    }
    async update(id: string, admin: AdminDTO): Promise<Administrator> {

        return await this.AdministratorRepository.save({ id, ...admin })

    }

}

