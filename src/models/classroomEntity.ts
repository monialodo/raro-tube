import { IsString, IsDate, IsNotEmpty, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Entity, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Administrator } from "./administratorEntity";
import { Student } from "./studentEntity";
import { SuperUser } from "./superUserEntity";
import { Teacher } from "./teacherEntity";
import { Video } from "./videoEntity";


@Entity('class')
export class Classroom {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'description' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'logo' })
  logo: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'tags' })
  tags: string;

  @ManyToOne(() => SuperUser, (superUser) => superUser.classroom)
  superUser: SuperUser;

  @ManyToOne(() => Administrator, (administrator) => administrator.classrooms)
  administrator: Administrator;

  @OneToOne(() => Teacher, (teacher) => teacher.classroom)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => Video, (video) => video.classroom)
  videos: Video[];

  @OneToMany(() => Student, (student) => student.classroom)
  students: Student[];

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}