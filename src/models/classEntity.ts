import { IsString, IsDefined, IsDate, IsNotEmpty } from "class-validator";
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { administrator } from "./administratorEntity";
import { student } from "./studentEntity";
import { superUser } from "./superUserEntity";
import { teacher } from "./teacherEntity";
import { video } from "./videoEntity";


@Entity()
export class studentsClass {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column({ name: 'name' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @Column({ name: 'description' })
  @IsNotEmpty()
  description: string;

  @IsString()
  @Column({ name: 'logo' })
  @IsNotEmpty()
  logo: string;

  @IsString()
  @Column({ name: 'tags' })
  @IsNotEmpty()
  tags: string;

  @ManyToOne(() => superUser, (superUser) => superUser.studentsClasss)
  superUser: superUser;

  @ManyToOne(() => administrator, (administrator) => administrator.studentsClasss)
  administrator: administrator;

  @OneToOne(() => teacher, (teacher) => teacher.studentsClass)
  @JoinColumn({ name: 'teacher_id' })
  teacher: teacher;

  @OneToMany(() => video, (video) => video.studentsClass)
  videos: video[];

  @OneToMany(() => student, (student) => student.studentsClass)
  students: student[];

  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}