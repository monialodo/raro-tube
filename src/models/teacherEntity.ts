import { IsString, IsDate, IsOptional, IsNotEmpty, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, UpdateDateColumn, CreateDateColumn, Entity } from "typeorm";
import { StudentsClass } from "./classEntity";
import { Video } from "./videoEntity";

@Entity('teachers')
export class Teacher {
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

  @OneToOne(() => StudentsClass, (studentsClass) => studentsClass.teacher)
  @JoinColumn({name: 'studentsClass_id'})
  studentsClass: StudentsClass;

  @OneToOne(() => Video, (video) => video.teacher)
  @JoinColumn({ name: 'video_id' })
  video: Video;
  
  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}