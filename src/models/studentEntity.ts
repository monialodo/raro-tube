import { IsString, IsDefined, IsDate } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { turma } from "./classEntity";
import { commentary } from "./commentaryEntity";

@Entity()
export class student {

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

  @OneToMany(() => commentary, (commentary) => commentary.student)
  commentarys: commentary[];

  @ManyToOne(() => turma, (turma) => turma.students)
  turma: turma;

  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @Column({ name: 'updated_at' })
  @IsDefined()
  updatedAt: Date;
}