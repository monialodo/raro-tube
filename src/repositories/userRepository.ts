import { EntityRepository, Repository } from "typeorm";

import { User } from "../models/userEntity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
