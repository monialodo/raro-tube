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
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { File } from "./fileEntity";

import { UserClassroom } from "./userClasroomEntity";
import { Video } from "./videoEntity";

@Entity("classrooms")
export class Classroom {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "description" })
  description: string;

  @JoinColumn({ name: "logo_id" })
  @OneToOne(() => File)
  logo: File;

  @OneToMany(() => Video, (video) => video.classroom)
  videos: Video[];

  @OneToMany(() => UserClassroom, (userClassroom) => userClassroom.classroom)
  userClassrooms: UserClassroom[];

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
    if (!this.id && !this.updatedAt) {
      this.id = uuidV4();
      this.updatedAt = new Date();
    }
    this.updatedAt = new Date();
  }
}
