import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Classroom } from "./classroomEntity";
import { User } from "./userEntity";

@Entity("user_classrooms")
export class UserClassroom {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @PrimaryColumn({ name: "classroom_id" })
  classroomId: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.userClassrooms)
  user: User;

  @JoinColumn({ name: "classroom_id" })
  @ManyToOne(() => Classroom, (classroom) => classroom.userClassrooms)
  classroom: Classroom;
}
