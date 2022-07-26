import { IsDefined, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { turma } from "./classEntity";


@Entity()
export class superUser {

  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name:'name'})
  @IsDefined()
  name: string;

  @Column({ name:'user_id'})
  @IsDefined()
  userId: string;

  @OneToMany(() => turma, (turma) => turma.superUser)
  turmas: turma[];

  @Column({ name:'created_at'})
  @IsDefined()
  createdAd: Date;

  @Column({name:'updated_at'})
  @IsDefined()
  updatedAt: Date;
}