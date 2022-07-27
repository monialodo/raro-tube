import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'role' })
  role: string;

  @IsDate()
  @IsNotEmpty()
  @Column({ name: 'created_at' })
  createdAt: Date;
  
  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}