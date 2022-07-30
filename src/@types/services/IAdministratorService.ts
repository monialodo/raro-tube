import { AdminDTO } from "../../@types/dto/AdministratorDTO";
import { Administrator } from "../../models/administratorEntity";

export interface IAdministratorService{
    

    findAll(): Promise<Administrator[]>;

    findOne(id:string):Promise<Administrator>;

    create(adminDto : AdminDTO):Promise<Administrator>;

    update(id:string,adminDto:AdminDTO):Promise<Administrator>;
    
    delete(id:string):Promise<void>

}