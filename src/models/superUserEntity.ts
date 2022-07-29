import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Classroom } from "./classroomEntity";


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

  @OneToMany(() => Classroom, (classroom) => classroom.superUser)
  classroom: Classroom[];

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name:'created_at'})
  createdAd: Date;
  
  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({name:'updated_at'})
  updatedAt: Date;
}