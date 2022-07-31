import {
  IsDefined,
  IsDate,
  IsNumber,
  Min,
  IsNotEmpty,
  IsUUID,
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { Student } from "./studentEntity";
import { Video } from "./videoEntity";

@Entity("comments")
export class Comment {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsNumber()
  @IsDefined()
  @Min(0)
  @Column({ name: "upvote_quantity" })
  upvoteQuantity: number;

  @IsNumber()
  @IsDefined()
  @Min(0)
  @Column({ name: "downvote_quantity" })
  downvoteQuantity: number;

  @ManyToOne(() => Video, (video) => video.comments)
  video: Video;

  @ManyToOne(() => Student, (student) => student.comments)
  student: Student;

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
