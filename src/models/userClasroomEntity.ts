import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Classroom } from "./classroomEntity";
import { User } from "./userEntity";

@Entity("user_classrooms")
export class UserClassroom {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @PrimaryColumn({ name: "classroom_id" })
  classroomId: string;

  @ManyToOne(() => User, (user) => user.userClassrooms)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Classroom, (classroom) => classroom.userClassrooms)
  @JoinColumn({ name: "classroom_id" })
  classroom: Classroom;

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;

  constructor() {
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
    this.updatedAt = new Date();
  }
}
