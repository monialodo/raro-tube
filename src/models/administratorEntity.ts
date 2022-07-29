import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Classroom } from "./classroomEntity";


@Entity('administrators')
export class Administrator {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'user_id' })
  userId: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @OneToMany(() => Classroom, (classroom) => classroom.administrator)
  classrooms: Classroom[];

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}