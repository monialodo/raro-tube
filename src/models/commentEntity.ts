import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CommentReaction } from "./commentReactionEntity";
import { User } from "./userEntity";
import { Video } from "./videoEntity";

@Entity("comments")
export class Comment {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsNumber()
  @IsDefined()
  @Min(0)
  @Column({ name: "upvote_quantity" })
  upvoteQuantity: number;

  @IsNumber()
  @IsDefined()
  @Min(0)
  @Column({ name: "downvote_quantity" })
  downvoteQuantity: number;

  @ManyToOne(() => Video, (video) => video.comments)
  @JoinColumn({ name: "video_id" })
  video: Video;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(
    () => CommentReaction,
    (commentReactions) => commentReactions.comment
  )
  commentReactions: CommentReaction[];

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
    if (!this.id && !this.updatedAt) {
      this.id = uuidV4();
      this.updatedAt = new Date();
    }
    this.updatedAt = new Date();
  }
}
