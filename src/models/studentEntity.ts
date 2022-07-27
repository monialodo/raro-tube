import { IsString, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { StudentsClass } from "./classEntity";
import { Comment } from "./commentEntity";

@Entity('students')
export class Student {
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
  @Column({ name: 'avatar' })
  avatar: string;

  @OneToMany(() => Comment, (commentary) => commentary.student)
  comments: Comment[];

  @ManyToOne(() => StudentsClass, (studentsClass) => studentsClass.students)
  studentsClass: StudentsClass;

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}