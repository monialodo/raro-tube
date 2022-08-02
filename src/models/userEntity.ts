import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Comment } from "./commentEntity";
import { CommentReaction } from "./commentReaction";
import { Favorites } from "./favoritesEntity";
import { UserClassroom } from "./userClasroom";

@Entity("user")
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

  @JoinColumn({ name: "avatar_id" })
  @OneToOne(() => File)
  avatar: File;

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
  @Column({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
