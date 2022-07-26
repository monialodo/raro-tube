import { IsDate, IsDefined, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { turma } from "./classEntity";




@Entity()
export class administrator {

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

  @OneToMany(() => turma, (turma) => turma.administrator)
  turmas: turma[];

  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @Column({ name: 'updated_at' })
  @IsDefined()
  updatedAt: Date;
}