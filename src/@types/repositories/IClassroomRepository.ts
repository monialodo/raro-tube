import { Repository } from "typeorm";

import { Classroom } from "../../models/classroomEntity";

export type IClassroomRepository = Repository<Classroom>;
