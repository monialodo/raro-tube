import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Comment } from "./commentEntity";
import { CommentReaction } from "./commentReactionEntity";
import { Favorites } from "./favoritesEntity";
import { File } from "./fileEntity";
import { UserClassroom } from "./userClassroomEntity";

@Entity("users")
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "password" })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "role" })
  role: string;

  @IsOptional()
  @OneToOne(() => File)
  @JoinColumn({ name: "avatar_id" })
  avatar?: File;

  @OneToMany(() => Favorites, (favorites) => favorites.user)
  favorites: Favorites[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => CommentReaction, (commentReaction) => commentReaction.user)
  commentReactions: CommentReaction[];

  @OneToMany(() => UserClassroom, (userClassroom) => userClassroom.user)
  userClassrooms: UserClassroom[];

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
  senha: string;

  constructor() {
    if (!this.id && !this.updatedAt) {
      this.id = uuidV4();
      this.updatedAt = new Date();
    }
    this.createdAt = new Date();
  }
}
