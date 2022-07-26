import { IsDate, isDate, IsDefined, IsNotEmpty, IsUUID } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { studentsClass } from "./classEntity";


@Entity()
export class superUser {

  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name:'name'})
  @IsNotEmpty()
  name: string;

  @Column({ name:'user_id'})
  @IsNotEmpty()
  userId: string;

  @OneToMany(() => studentsClass, (studentsClass) => studentsClass.superUser)
  studentsClasss: studentsClass[];

  @IsDate()
  @Column({ name:'created_at'})
  @IsNotEmpty()
  createdAd: Date;

  @IsDate()
  @UpdateDateColumn({name:'updated_at'})
  updatedAt: Date;
}