import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UserClassroom } from "./userClasroom";
import { Video } from "./videoEntity";

@Entity("class")
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

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
