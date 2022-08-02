import { EntityRepository, Repository } from "typeorm";

import { IAdministratorRepository } from "../@types/repositories/IAdministratorRepository";
import { Administrator } from "../models/administratorEntity";

@EntityRepository(Administrator)
export class AdministratorRepository
  extends Repository<Administrator>
  implements IAdministratorRepository {}
