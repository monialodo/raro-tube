import { Administrator } from "../models/administratorEntity";
import { EntityRepository, Repository } from "typeorm";
import { IAdministratorRepository } from "../@types/repositories/IAdministratorRepository";


@EntityRepository(Administrator)
export class AdministratorRepository 
extends Repository<Administrator>
implements IAdministratorRepository {
}