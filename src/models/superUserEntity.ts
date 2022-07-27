import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { StudentsClass } from "./classEntity";


@Entity('super_user')
export class SuperUser {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name:'name'})
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name:'user_id'})
  userId: string;

  @OneToMany(() => StudentsClass, (studentsClass) => studentsClass.superUser)
  studentsClass: StudentsClass[];

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name:'created_at'})
  createdAd: Date;
  
  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({name:'updated_at'})
  updatedAt: Date;
}