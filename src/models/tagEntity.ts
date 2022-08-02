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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { VideoTag } from "./videoTagEntity";

@Entity("tags")
export class Tag {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "name" })
  name: string;

  @OneToMany(() => VideoTag, (videoTag) => videoTag.tag)
  videoTags: VideoTag[];

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
