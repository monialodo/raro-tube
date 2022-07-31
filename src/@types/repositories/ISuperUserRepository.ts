import { SuperUser } from "../../models/superUserEntity";
import { SuperUserDTO } from "../dto/SuperUserDto";

export interface ISuperUserRepository {
  save(superUser: SuperUserDTO): Promise<SuperUser>;
  find(): Promise<SuperUser[]>;
  findOne(id: string): Promise<SuperUser>;
  update(id: string, superUser: SuperUser): Promise<SuperUser>;
  delete(id: string): Promise<void>;
}
