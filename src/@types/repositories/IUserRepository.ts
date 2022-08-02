import { Repository } from "typeorm";

import { User } from "../../models/userEntity";

export type IUserRepository = Repository<User>;
