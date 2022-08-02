import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { videoTags } from "./videoTags";

@Entity("tags")
export class Tag {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "name" })
  name: string;

  @OneToMany(() => videoTags, (videoTags) => videoTags.tag)
  videosTags: videoTags[];

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
