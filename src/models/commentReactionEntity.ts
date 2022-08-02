import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Comment } from "./commentEntity";
import { User } from "./userEntity";

@Entity("comment_reactions")
export class CommentReaction {
  @PrimaryColumn({ name: "comment_id" })
  commentId: string;

  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @IsString()
  @IsOptional()
  @Column({ name: "reaction" })
  reaction?: string;

  @JoinColumn({ name: "comment_id" })
  @ManyToOne(() => Comment, (comment) => comment.commentReactions)
  comment: Comment;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.commentReactions)
  user: User;

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

  constructor() {
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
    this.updatedAt = new Date();
  }
}
