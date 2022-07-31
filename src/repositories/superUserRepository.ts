import { EntityRepository, Repository } from "typeorm";

import { SuperUser } from "../models/superUserEntity";

@EntityRepository(SuperUser)
export class SuperUserRepository extends Repository<SuperUser> {}
