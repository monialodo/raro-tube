import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class users {
  
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
  @Column({ name: 'updated_at' })
  updatedAt: Date;
}