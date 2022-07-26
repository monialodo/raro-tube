import { IsString, IsDefined, IsDate, IsNumber } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { student } from "./studentEntity";
import { video } from "./videoEntity";


@Entity()
export class commentary {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNumber()
  @Column({ name: 'quantidade_downvote' })
  @IsDefined()
  quantidadeUpvote: number;

  @IsNumber()
  @Column({ name: 'quantidade_downvote' })
  @IsDefined()
  quantidadeDownvote: number;

  @ManyToOne(() => video, (video) => video.commentarys)
  video: video;

  @ManyToOne(() => student, (student) => student.commentarys)
  student: student;

  @IsDate()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @IsDate()
  @Column({ name: 'updated_at' })
  updatedAt: Date;
}