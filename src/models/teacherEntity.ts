import { IsString, IsDefined, IsDate } from "class-validator";
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { turma } from "./classEntity";
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
  @Column({ name: 'password' })
  @IsDefined()
  password: string;

  @IsString()
  @Column({ name: 'avatar' })
  @IsDefined()
  avatar: string;

  @OneToOne(() => turma, (turma) => turma.teacher)
  @JoinColumn({name: 'turma_id'})
  turma: turma;

  @OneToOne(() => video, (video) => video.teacher)
  @JoinColumn({ name: 'video_id' })
  video: video;
  
  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @Column({ name: 'updated_at' })
  @IsDefined()
  updatedAt: Date;
}