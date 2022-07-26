import { IsString, IsDefined, IsDate, IsOptional } from "class-validator";
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { studentsClass } from "./classEntity";
import { video } from "./videoEntity";




export class teacher {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column({ name: 'name' })
  @IsDefined()
  name: string;

  @IsString()
  @Column({ name: 'user_id' })
  @IsDefined()
  userId: string;

  @IsString()
  @Column({ name: 'avatar', nullable: true })
  @IsOptional()
  avatar: string;

  @OneToOne(() => studentsClass, (studentsClass) => studentsClass.teacher)
  @JoinColumn({name: 'studentsClass_id'})
  studentsClass: studentsClass;

  @OneToOne(() => video, (video) => video.teacher)
  @JoinColumn({ name: 'video_id' })
  video: video;
  
  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}