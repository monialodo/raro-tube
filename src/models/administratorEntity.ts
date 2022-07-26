import { IsDate, IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { studentsClass } from "./classEntity";




@Entity()
export class administrator {

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
  @Column({ name: 'avatar', nullable: true })
  @IsOptional()
  avatar: string;

  @OneToMany(() => studentsClass, (studentsClass) => studentsClass.administrator)
  studentsClasss: studentsClass[];

  @IsDate()
  @Column({ name: 'created_at' })
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}