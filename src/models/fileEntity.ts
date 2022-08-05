import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @IsNumber()
  @IsDefined()
  @Column({ name: "size_bytes" })
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

  @IsDate()
  @IsOptional()
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;

  constructor() {
    if (!this.id && !this.updatedAt) {
      this.id = uuidV4();
      this.updatedAt = new Date();
    }
    this.createdAt = new Date();
  }
}
