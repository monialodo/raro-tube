import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("files")
export class File {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "path" })
  path: string;

  @IsNotEmpty()
  @Column({ name: "sizeBytes" })
  sizeBytes: number;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "format" })
  format: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "type" })
  type: string;

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
