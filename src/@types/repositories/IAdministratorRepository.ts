import { DeleteResult } from "typeorm";

import { Administrator } from "../../models/administratorEntity";
import { AdminDTO } from "../dto/AdministratorDto";

export interface IAdministratorRepository {
  find(): Promise<Administrator[]>;
  findOne(id: string): Promise<Administrator>;
  save(adminDto: AdminDTO): Promise<Administrator>;
  delete(id: string): Promise<DeleteResult>;
}
