import { Administrator } from "../../models/administratorEntity";
import { AdminDTO } from "../../@types/dto/AdministratorDto";
import { DeleteResult } from "typeorm";

export interface IAdministratorRepository {

    find(): Promise<Administrator[]>;
    findOne(id: string): Promise<Administrator>;
    save(adminDto: AdminDTO): Promise<Administrator>;
    delete(id:string):Promise<DeleteResult>

}