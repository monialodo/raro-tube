import { Repository } from "typeorm";
import { UserClassroom } from "../../models/userClassroomEntity";

export type IUserClassroomRepository = Repository<UserClassroom>