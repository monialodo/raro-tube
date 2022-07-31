import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Classroom } from "./classroomEntity";
import { Comment } from "./commentEntity";
import { User } from "./userEntity";

@Entity("students")
export class Student {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @IsString()
  @IsOptional()
  @Column({ name: "avatar" })
  avatar: string;

  @OneToMany(() => Comment, (commentary) => commentary.student)
  comments: Comment[];

  @OneToOne(() => Classroom)
  @JoinColumn({ name: "class_id" })
  classroom: Classroom;

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt: Date;
}
