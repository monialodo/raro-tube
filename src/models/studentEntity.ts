import { IsString, IsDefined, IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, UpdateDateColumn } from "typeorm";
import { studentsClass } from "./classEntity";
import { commentary } from "./commentaryEntity";

@Entity()
export class student {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column({ name: 'name' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @Column({ name: 'user_id' })
  @IsNotEmpty()
  userId: string;

  @IsString()
  @Column({ name: 'avatar' })
  @IsOptional()
  avatar: string;

  @OneToMany(() => commentary, (commentary) => commentary.student)
  commentarys: commentary[];

  @ManyToOne(() => studentsClass, (studentsClass) => studentsClass.students)
  studentsClass: studentsClass;

  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}