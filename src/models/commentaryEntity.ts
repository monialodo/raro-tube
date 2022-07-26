import { IsString, IsDefined, IsDate, IsNumber, Min, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { student } from "./studentEntity";
import { video } from "./videoEntity";


@Entity()
export class commentary {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNumber()
  @Column({ name: 'downvote_quantity' })
  @IsNotEmpty()
  @Min(0)
  UpvoteQuantity: number;

  @IsNumber()
  @Column({ name: 'downvote_quantity' })
  @IsNotEmpty()
  @Min(0)
  DownvoteQuantity: number;

  @ManyToOne(() => video, (video) => video.commentarys)
  video: video;

  @ManyToOne(() => student, (student) => student.commentarys)
  student: student;

  @IsDate()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}