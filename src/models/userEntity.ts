import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "password" })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "role" })
  role: string;

  @IsDate()
  @IsNotEmpty()
  @Column({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
