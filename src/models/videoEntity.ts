import { IsString, IsDefined, IsDate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { studentsClass } from "./classEntity";
import { commentary } from "./commentaryEntity";
import { teacher } from "./teacherEntity";


@Entity()
export class video {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column({ name: 'name' })
  @IsDefined()
  name: string;

  @IsString()
  @Column({ name: 'duration' })
  @IsDefined()
  duration: string;

  @IsString()
  @Column({ name: 'subjects' })
  @IsDefined()
  subjects: string;

  @IsString()
  @Column({ name: 'thumbnail' })
  @IsDefined()
  thumbnail: string;

  @IsString()
  @Column({ name: 'tags' })
  @IsDefined()
  tags: string;

  @ManyToOne(() => studentsClass, (studentsClass) => studentsClass.videos)
  studentsClass: studentsClass;

  @OneToOne(() => teacher, (teacher) => teacher.video)
  @JoinColumn({ name: 'teacher_id' })
  teacher: teacher;

  @OneToMany(() => commentary, (commentary) => commentary.video)
  commentarys: commentary[];

  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}