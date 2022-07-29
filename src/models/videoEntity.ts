import { IsString, IsDate, IsNotEmpty, IsUUID } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { Classroom } from "./classroomEntity";
import { Comment } from "./commentEntity";
import { Teacher } from "./teacherEntity";


@Entity('videos')
export class Video {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'duration' })
  duration: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'subjects' })
  subjects: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'thumbnail' })
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'tags' })
  tags: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.videos)
  classroom: Classroom;

  @OneToOne(() => Teacher, (teacher) => teacher.video)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @IsDate()
  @IsNotEmpty()
  @Column({ name: 'created_at' })
  createdAt: Date;
  
  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}