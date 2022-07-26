import { IsString, IsDefined, IsDate } from "class-validator";
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Entity, ManyToOne, OneToMany } from "typeorm";
import { administrator } from "./administratorEntity";
import { student } from "./studentEntity";
import { superUser } from "./superUserEntity";
import { teacher } from "./teacherEntity";
import { video } from "./videoEntity";


@Entity()
export class turma {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column({ name: 'name' })
  @IsDefined()
  name: string;

  @IsString()
  @Column({ name: 'description' })
  @IsDefined()
  description: string;

  @IsString()
  @Column({ name: 'logo' })
  @IsDefined()
  logo: string;

  @IsString()
  @Column({ name: 'tags' })
  @IsDefined()
  tags: string;

  @ManyToOne(() => superUser, (superUser) => superUser.turmas)
  superUser: superUser;

  @ManyToOne(() => administrator, (administrator) => administrator.turmas)
  administrator: administrator;

  @OneToOne(() => teacher, (teacher) => teacher.turma)
  @JoinColumn({ name: 'teacher_id' })
  teacher: teacher;

  @OneToMany(() => video, (video) => video.turma)
  videos: video[];

  @OneToMany(() => student, (student) => student.turma)
  students: student[];

  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @Column({ name: 'updated_at' })
  @IsDefined()
  updatedAt: Date;
}