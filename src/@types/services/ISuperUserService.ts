import { SuperUser } from "../../models/superUserEntity";
import { SuperUserDTO } from "../dto/SuperUserDto";

export interface ISuperUserService {
  create(superUserDTO: SuperUserDTO): Promise<SuperUser>;
  findAll(): Promise<SuperUser[]>;
  findOne(id: string): Promise<SuperUser>;
  update(id: string, superUserDTO: SuperUserDTO): Promise<SuperUser>;
  delete(id: string): Promise<void>;
}
